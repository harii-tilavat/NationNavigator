window.googletag = window.googletag || { cmd: [] };
window.t = async function (t) {
  return new Promise((resolve) => {
    if (sessionStorage.getItem(t) === null) {
      sessionStorage.setItem(t, "1");
    }
    resolve();
  });
};
window.e = async (t) =>
  new Promise((e) => {
    let a = sessionStorage.getItem(t);
    null === a ? ((a = 1), sessionStorage.setItem(t, a), e()) : ((a = parseInt(a, 10) + 1), sessionStorage.setItem(t, a.toString()), e());
  }),
  window.a = function (t) {
    fetch(`https://tags.profitsence.com:2053/API/account/getTags?adId=${t}&adCount=${sessionStorage.getItem(t)}&countryCode=${sessionStorage.getItem("ps_country_code")}`)
      .then(response => {
        if (!response.ok) throw Error(`Network response was not ok: ${response.statusText}`);
        return response.json();
      })
      .then(async a => {
        if (200 === a[0].status && ("" !== a[0].data.codes || null !== a[0].data.codes || void 0 !== a[0].data.codes)) {
          if (window.googletag) {
            window.googletag.cmd.push(() => {
              const slots = window.googletag.pubads().getSlots();
              slots.forEach((slot) => { window.googletag.destroySlots([slot]); });
            });
          }
          var r;
          !0 === a[0].data.reset
            ? sessionStorage.setItem(t, "1")
            : await e(t),
            "" !== a[0].data.countryCode &&
            null !== a[0].data.countryCode &&
            void 0 !== a[0].data.countryCode &&
            sessionStorage.setItem(
              "ps_country_code",
              a[0].data.countryCode
            );
          let n = document.getElementById(t);
          n.innerHTML = a[0].data.psCode;
          let o = n.getElementsByTagName("script"),
            i = o.length;
          for (let l = 0; l < i; l++) {
            let s = document.createElement("script");
            o[l].src && (s.src = o[l].src),
              o[l].text && (s.text = o[l].text),
              n.appendChild(s);
          }
          let d = document.getElementById("load_" + t),
            c = document.getElementById("backfill_load_" + t),
            u = { width: 0, height: 0 };
          d.innerHTML = a[0].data.codes;
          let $ = d.getElementsByTagName("script"),
            h = $.length,
            m = async (t, e = !1) => {
              let a = document.createElement("script");
              for (let r = 0; r < $[t].attributes.length; r++) {
                let n = $[t].attributes[r];
                a.setAttribute(n.nodeName, n.nodeValue);
              }
              if ((d.appendChild(a), e))
                return new Promise((t) => {
                  (a.onload = () => {
                    t();
                  }),
                    (a.onerror = () => {
                      t();
                    });
                });
            },
            g = async (t) =>
              new Promise((e) => {
                let a = document.createElement("script");
                for (let r = 0; r < $[t].attributes.length; r++) {
                  let n = $[t].attributes[r];
                  a.setAttribute(n.nodeName, n.nodeValue);
                }
                (a.text = $[t].text), d.appendChild(a), e();
              });
          for (let p = 0; p < h; p++) {
            if ($[p].src) {
              let f = Array.from($[p].attributes).some(function (t) {
                return "async" === t.name;
              });
              !0 === f ? m(p) : await m(p, !0);
            }
            $[p].text && (await g(p));
          }
          let y = async () => {
            if (0 === u.width || 0 === u.height) {
              c.innerHTML = a[0].data.backfill;
              let t = c.getElementsByTagName("script"),
                e = t.length,
                r = async (e, a = !1) => {
                  let r = document.createElement("script");
                  for (let n = 0; n < t[e].attributes.length; n++) {
                    let o = t[e].attributes[n];
                    r.setAttribute(o.nodeName, o.nodeValue);
                  }
                  if ((c.appendChild(r), a))
                    return new Promise((t) => {
                      (r.onload = () => {
                        t();
                      }),
                        (r.onerror = () => {
                          t();
                        });
                    });
                },
                n = async (e) =>
                  new Promise((a) => {
                    let r = document.createElement("script");
                    for (let n = 0; n < t[e].attributes.length; n++) {
                      let o = t[e].attributes[n];
                      r.setAttribute(o.nodeName, o.nodeValue);
                    }
                    (r.text = t[e].text), c.appendChild(r), a();
                  });
              for (let o = 0; o < e; o++) {
                if (t[o].src) {
                  let i = Array.from($[o].attributes).some(function (t) {
                    return "async" === t.name;
                  });
                  !0 === i ? r(o) : await r(o, !0);
                }
                t[o].text && (await n(o));
              }
            } else c.innerHTML = "";
          };
          function w(t) {
            for (
              var e = t.scrollWidth, a = t.scrollHeight, r = 0;
              r < t.children.length;
              r++
            ) {
              var n = w(t.children[r]);
              (e = Math.max(e, n.width)), (a = Math.max(a, n.height));
            }
            return { width: e, height: a };
          }
          let b = !1;
          function I(t, e) {
            for (let a of ((b = !0), t))
              ("childList" === a.type || "attributes" === a.type) &&
                setTimeout((t) => {
                  (u = w(d)).width > 0 && u.height > 0 && (c.innerHTML = ""),
                    setTimeout((t) => {
                      y();
                    }, 3e3);
                }, 150);
          }
          new MutationObserver(I).observe(d, {
            attributes: !0,
            childList: !0,
            attributeFilter: ["style", "width", "height"],
            characterData: !0,
            subtree: !0,
          }),
            setTimeout((t) => {
              !1 === b && y();
            }, 3e3);
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error.message);
      });
  };

if (!window.adRotationScriptLoaded) {
  window.adRotationScriptLoaded = !0;
  let t = async (t) =>
    new Promise((e) => {
      null === sessionStorage.getItem(t) && sessionStorage.setItem(t, "1"),
        null === sessionStorage.getItem("ps_country_code") &&
        sessionStorage.setItem("ps_country_code", ""),
        e();
    }),
    e = async (t) =>
      new Promise((e) => {
        let a = sessionStorage.getItem(t);
        null === a ? ((a = 1), sessionStorage.setItem(t, a), e()) : ((a = parseInt(a, 10) + 1), sessionStorage.setItem(t, a.toString()), e());
      }),
    a = (t) => {
      fetch(
        "https://tags.profitsence.com:2053/API/account/getTags?adId=" +
        t +
        "&adCount=" +
        sessionStorage.getItem(t) +
        "&countryCode=" +
        sessionStorage.getItem("ps_country_code")
      )
        .then((t) => {
          if (!t.ok)
            throw Error(`Network response was not ok: ${t.statusText}`);
          return t.json();
        })
        .then(async (a) => {
          if (
            200 === a[0].status &&
            ("" !== a[0].data.codes ||
              null !== a[0].data.codes ||
              void 0 !== a[0].data.codes)
          ) {
            if (window.googletag) {
              window.googletag.cmd.push(() => {
                const slots = window.googletag.pubads().getSlots();
                slots.forEach((slot) => { window.googletag.destroySlots([slot]); });
              });
            }
            var r;
            !0 === a[0].data.reset
              ? sessionStorage.setItem(t, "1")
              : await e(t),
              "" !== a[0].data.countryCode &&
              null !== a[0].data.countryCode &&
              void 0 !== a[0].data.countryCode &&
              sessionStorage.setItem(
                "ps_country_code",
                a[0].data.countryCode
              );
            let n = document.getElementById(t);
            n.innerHTML = a[0].data.psCode;
            let o = n.getElementsByTagName("script"),
              i = o.length;
            for (let l = 0; l < i; l++) {
              let s = document.createElement("script");
              o[l].src && (s.src = o[l].src),
                o[l].text && (s.text = o[l].text),
                n.appendChild(s);
            }
            let d = document.getElementById("load_" + t),
              c = document.getElementById("backfill_load_" + t),
              u = { width: 0, height: 0 };
            d.innerHTML = a[0].data.codes;
            let $ = d.getElementsByTagName("script"),
              h = $.length,
              m = async (t, e = !1) => {
                let a = document.createElement("script");
                for (let r = 0; r < $[t].attributes.length; r++) {
                  let n = $[t].attributes[r];
                  a.setAttribute(n.nodeName, n.nodeValue);
                }
                if ((d.appendChild(a), e))
                  return new Promise((t) => {
                    (a.onload = () => {
                      t();
                    }),
                      (a.onerror = () => {
                        t();
                      });
                  });
              },
              g = async (t) =>
                new Promise((e) => {
                  let a = document.createElement("script");
                  for (let r = 0; r < $[t].attributes.length; r++) {
                    let n = $[t].attributes[r];
                    a.setAttribute(n.nodeName, n.nodeValue);
                  }
                  (a.text = $[t].text), d.appendChild(a), e();
                });
            for (let p = 0; p < h; p++) {
              if ($[p].src) {
                let f = Array.from($[p].attributes).some(function (t) {
                  return "async" === t.name;
                });
                !0 === f ? m(p) : await m(p, !0);
              }
              $[p].text && (await g(p));
            }
            let y = async () => {
              if (0 === u.width || 0 === u.height) {
                c.innerHTML = a[0].data.backfill;
                let t = c.getElementsByTagName("script"),
                  e = t.length,
                  r = async (e, a = !1) => {
                    let r = document.createElement("script");
                    for (let n = 0; n < t[e].attributes.length; n++) {
                      let o = t[e].attributes[n];
                      r.setAttribute(o.nodeName, o.nodeValue);
                    }
                    if ((c.appendChild(r), a))
                      return new Promise((t) => {
                        (r.onload = () => {
                          t();
                        }),
                          (r.onerror = () => {
                            t();
                          });
                      });
                  },
                  n = async (e) =>
                    new Promise((a) => {
                      let r = document.createElement("script");
                      for (let n = 0; n < t[e].attributes.length; n++) {
                        let o = t[e].attributes[n];
                        r.setAttribute(o.nodeName, o.nodeValue);
                      }
                      (r.text = t[e].text), c.appendChild(r), a();
                    });
                for (let o = 0; o < e; o++) {
                  if (t[o].src) {
                    let i = Array.from($[o].attributes).some(function (t) {
                      return "async" === t.name;
                    });
                    !0 === i ? r(o) : await r(o, !0);
                  }
                  t[o].text && (await n(o));
                }
              } else c.innerHTML = "";
            };
            function w(t) {
              for (
                var e = t.scrollWidth, a = t.scrollHeight, r = 0;
                r < t.children.length;
                r++
              ) {
                var n = w(t.children[r]);
                (e = Math.max(e, n.width)), (a = Math.max(a, n.height));
              }
              return { width: e, height: a };
            }
            let b = !1;
            function I(t, e) {
              for (let a of ((b = !0), t))
                ("childList" === a.type || "attributes" === a.type) &&
                  setTimeout((t) => {
                    (u = w(d)).width > 0 && u.height > 0 && (c.innerHTML = ""),
                      setTimeout((t) => {
                        y();
                      }, 3e3);
                  }, 150);
            }
            new MutationObserver(I).observe(d, {
              attributes: !0,
              childList: !0,
              attributeFilter: ["style", "width", "height"],
              characterData: !0,
              subtree: !0,
            }),
              setTimeout((t) => {
                !1 === b && y();
              }, 3e3);
          }
        })
        .catch((t) => {
          console.error("Error during fetch:", t.message);
        });
    };
  document.addEventListener("DOMContentLoaded", async () => {
    let e = document.querySelectorAll('[id^="ps_ad_rotation_id_"]'),
      r = Array.from(e).map((t) => t.id);
    try {
      for (let n of r) await t(n), a(n);
    } catch (o) {
      console.error("Error loading ad codes:", o);
    }
  });
}
