import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Request, Response } from 'express';
export type SameSite = 'Lax' | 'None' | 'Strict';
export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: SameSite;
}

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly documentIsAccessible: boolean;
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any) {
    this.documentIsAccessible = isPlatformBrowser(this.platformId);
  }
  private static getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]{}()|=;+?,.*^$])/gi, '\\$1');
    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }

  private static safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      // probably it is not uri encoded. return as is
      return encodedURIComponent;
    }
  }

  check(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }
    name = encodeURIComponent(name);
    const regExp: RegExp = CookieService.getCookieRegExp(name);
    return regExp.test(this.document.cookie);
  }

  get(name: string): string {
    if (this.documentIsAccessible && this.check(name)) {
      name = encodeURIComponent(name);
      const regExp: RegExp = CookieService.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this.document.cookie) as RegExpExecArray;
      return result[1] ? CookieService.safeDecodeURIComponent(result[1]) : '';
    } else {
      return '';
    }
  }
  getAll(): { [key: string]: string } {
    if (!this.documentIsAccessible) {
      return {};
    }
    const cookies: { [key: string]: string } = {};
    const document: any = this.document;
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach((currentCookie: any) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        cookies[CookieService.safeDecodeURIComponent(cookieName.replace(/^ /, ''))] = CookieService.safeDecodeURIComponent(cookieValue);
      });
    }
    return cookies;
  }
  set(name: string, value: string, expires?: CookieOptions['expires'], path?: CookieOptions['path'], domain?: CookieOptions['domain'], secure?: CookieOptions['secure'], sameSite?: SameSite): void;

  set(name: string, value: string, options?: CookieOptions): void;
  set(name: string, value: string, expiresOrOptions?: CookieOptions['expires'] | CookieOptions, path?: CookieOptions['path'], domain?: CookieOptions['domain'], secure?: CookieOptions['secure'], sameSite?: SameSite): void {
    if (!this.documentIsAccessible) {
      return;
    }
    if (typeof expiresOrOptions === 'number' || expiresOrOptions instanceof Date || path || domain || secure || sameSite) {
      const optionsBody = {
        expires: expiresOrOptions as CookieOptions['expires'],
        path,
        domain,
        secure,
        sameSite: sameSite ? sameSite : 'Lax',
      };
      this.set(name, value, optionsBody);
      return;
    }
    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
    const options = expiresOrOptions ? expiresOrOptions : {};
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + options.expires * 1000 * 60 * 60 * 24);
        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + options.expires.toUTCString() + ';';
      }
    }
    if (options.path) {
      cookieString += 'path=' + options.path + ';';
    }
    if (options.domain) {
      cookieString += 'domain=' + options.domain + ';';
    }
    if (options.secure === false && options.sameSite === 'None') {
      options.secure = true;
      console.warn(`Cookie ${name} was forced with secure flag because sameSite=None.`);
    }
    if (options.secure) {
      cookieString += 'secure;';
    }
    if (!options.sameSite) {
      options.sameSite = 'Lax';
    }
    cookieString += 'sameSite=' + options.sameSite + ';';
    this.document.cookie = cookieString;
  }

  delete(name: string, path?: CookieOptions['path'], domain?: CookieOptions['domain'], secure?: CookieOptions['secure'], sameSite: SameSite = 'Lax'): void {
    if (!this.documentIsAccessible) {
      return;
    }
    const expiresDate = new Date('Thu, 01 Jan 1970 00:00:01 GMT');
    this.set(name, '', { expires: expiresDate, path, domain, secure, sameSite });
  }
  deleteAll(path?: CookieOptions['path'], domain?: CookieOptions['domain'], secure?: CookieOptions['secure'], sameSite: SameSite = 'Lax'): void {
    if (!this.documentIsAccessible) {
      return;
    }
    const cookies: any = this.getAll();
    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, path, domain, secure, sameSite);
      }
    }
  }
}
