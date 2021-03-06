var Module = (function () {
  var _scriptDir = import.meta.url;

  return function (Module) {
    Module = Module || {};

    var e;
    e || (e = typeof Module !== 'undefined' ? Module : {});
    var aa, r;
    e.ready = new Promise(function (a, b) {
      aa = a;
      r = b;
    });
    var t = {},
      u;
    for (u in e) e.hasOwnProperty(u) && (t[u] = e[u]);
    var v = '',
      ba;
    v = self.location.href;
    _scriptDir && (v = _scriptDir);
    0 !== v.indexOf('blob:')
      ? (v = v.substr(0, v.lastIndexOf('/') + 1))
      : (v = '');
    ba = function (a) {
      var b = new XMLHttpRequest();
      b.open('GET', a, !1);
      b.responseType = 'arraybuffer';
      b.send(null);
      return new Uint8Array(b.response);
    };
    var ca = e.print || console.log.bind(console),
      w = e.printErr || console.warn.bind(console);
    for (u in t) t.hasOwnProperty(u) && (e[u] = t[u]);
    t = null;
    var y;
    e.wasmBinary && (y = e.wasmBinary);
    var noExitRuntime;
    e.noExitRuntime && (noExitRuntime = e.noExitRuntime);
    'object' !== typeof WebAssembly && z('no native wasm support detected');
    var A,
      da = !1,
      ea = new TextDecoder('utf8');
    function fa(a, b, c) {
      var d = B;
      if (0 < c) {
        c = b + c - 1;
        for (var f = 0; f < a.length; ++f) {
          var g = a.charCodeAt(f);
          if (55296 <= g && 57343 >= g) {
            var l = a.charCodeAt(++f);
            g = (65536 + ((g & 1023) << 10)) | (l & 1023);
          }
          if (127 >= g) {
            if (b >= c) break;
            d[b++] = g;
          } else {
            if (2047 >= g) {
              if (b + 1 >= c) break;
              d[b++] = 192 | (g >> 6);
            } else {
              if (65535 >= g) {
                if (b + 2 >= c) break;
                d[b++] = 224 | (g >> 12);
              } else {
                if (b + 3 >= c) break;
                d[b++] = 240 | (g >> 18);
                d[b++] = 128 | ((g >> 12) & 63);
              }
              d[b++] = 128 | ((g >> 6) & 63);
            }
            d[b++] = 128 | (g & 63);
          }
        }
        d[b] = 0;
      }
    }
    var ha = new TextDecoder('utf-16le');
    function ia(a, b) {
      var c = a >> 1;
      for (b = c + b / 2; !(c >= b) && D[c]; ) ++c;
      return ha.decode(B.subarray(a, c << 1));
    }
    function ja(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (2 > c) return 0;
      c -= 2;
      var d = b;
      c = c < 2 * a.length ? c / 2 : a.length;
      for (var f = 0; f < c; ++f) (E[b >> 1] = a.charCodeAt(f)), (b += 2);
      E[b >> 1] = 0;
      return b - d;
    }
    function ka(a) {
      return 2 * a.length;
    }
    function la(a, b) {
      for (var c = 0, d = ''; !(c >= b / 4); ) {
        var f = F[(a + 4 * c) >> 2];
        if (0 == f) break;
        ++c;
        65536 <= f
          ? ((f -= 65536),
            (d += String.fromCharCode(55296 | (f >> 10), 56320 | (f & 1023))))
          : (d += String.fromCharCode(f));
      }
      return d;
    }
    function ma(a, b, c) {
      void 0 === c && (c = 2147483647);
      if (4 > c) return 0;
      var d = b;
      c = d + c - 4;
      for (var f = 0; f < a.length; ++f) {
        var g = a.charCodeAt(f);
        if (55296 <= g && 57343 >= g) {
          var l = a.charCodeAt(++f);
          g = (65536 + ((g & 1023) << 10)) | (l & 1023);
        }
        F[b >> 2] = g;
        b += 4;
        if (b + 4 > c) break;
      }
      F[b >> 2] = 0;
      return b - d;
    }
    function na(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        55296 <= d && 57343 >= d && ++c;
        b += 4;
      }
      return b;
    }
    var G, oa, B, E, D, F, H, pa, qa;
    function ra(a) {
      G = a;
      e.HEAP8 = oa = new Int8Array(a);
      e.HEAP16 = E = new Int16Array(a);
      e.HEAP32 = F = new Int32Array(a);
      e.HEAPU8 = B = new Uint8Array(a);
      e.HEAPU16 = D = new Uint16Array(a);
      e.HEAPU32 = H = new Uint32Array(a);
      e.HEAPF32 = pa = new Float32Array(a);
      e.HEAPF64 = qa = new Float64Array(a);
    }
    var sa = e.INITIAL_MEMORY || 16777216;
    e.wasmMemory
      ? (A = e.wasmMemory)
      : (A = new WebAssembly.Memory({ initial: sa / 65536, maximum: 32768 }));
    A && (G = A.buffer);
    sa = G.byteLength;
    ra(G);
    var J,
      ta = [],
      ua = [],
      va = [],
      wa = [];
    function xa() {
      var a = e.preRun.shift();
      ta.unshift(a);
    }
    var K = 0,
      ya = null,
      L = null;
    e.preloadedImages = {};
    e.preloadedAudios = {};
    function z(a) {
      if (e.onAbort) e.onAbort(a);
      w(a);
      da = !0;
      a = new WebAssembly.RuntimeError(
        'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.',
      );
      r(a);
      throw a;
    }
    function za() {
      var a = N;
      return String.prototype.startsWith
        ? a.startsWith('data:application/octet-stream;base64,')
        : 0 === a.indexOf('data:application/octet-stream;base64,');
    }
    var N = 'imagequant.wasm';
    if (!za()) {
      var Aa = N;
      N = e.locateFile ? e.locateFile(Aa, v) : v + Aa;
    }
    function Ba() {
      try {
        if (y) return new Uint8Array(y);
        if (ba) return ba(N);
        throw 'both async and sync fetching of the wasm failed';
      } catch (a) {
        z(a);
      }
    }
    function Ca() {
      return y || 'function' !== typeof fetch
        ? Promise.resolve().then(Ba)
        : fetch(N, { credentials: 'same-origin' })
            .then(function (a) {
              if (!a.ok) throw "failed to load wasm binary file at '" + N + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ba();
            });
    }
    function O(a) {
      for (; 0 < a.length; ) {
        var b = a.shift();
        if ('function' == typeof b) b(e);
        else {
          var c = b.J;
          'number' === typeof c
            ? void 0 === b.G
              ? J.get(c)()
              : J.get(c)(b.G)
            : c(void 0 === b.G ? null : b.G);
        }
      }
    }
    function Da(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError('Unknown type size: ' + a);
      }
    }
    var Ea = void 0;
    function P(a) {
      for (var b = ''; B[a]; ) b += Ea[B[a++]];
      return b;
    }
    var Q = {},
      R = {},
      S = {};
    function Fa(a) {
      if (void 0 === a) return '_unknown';
      a = a.replace(/[^a-zA-Z0-9_]/g, '$');
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? '_' + a : a;
    }
    function Ga(a, b) {
      a = Fa(a);
      return new Function(
        'body',
        'return function ' +
          a +
          '() {\n    "use strict";    return body.apply(this, arguments);\n};\n',
      )(b);
    }
    function Ha(a) {
      var b = Error,
        c = Ga(a, function (d) {
          this.name = a;
          this.message = d;
          d = Error(d).stack;
          void 0 !== d &&
            (this.stack =
              this.toString() + '\n' + d.replace(/^Error(:[^\n]*)?\n/, ''));
        });
      c.prototype = Object.create(b.prototype);
      c.prototype.constructor = c;
      c.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ': ' + this.message;
      };
      return c;
    }
    var Ia = void 0;
    function T(a) {
      throw new Ia(a);
    }
    var Ja = void 0;
    function Ka(a, b) {
      function c(h) {
        h = b(h);
        if (h.length !== d.length)
          throw new Ja('Mismatched type converter count');
        for (var p = 0; p < d.length; ++p) U(d[p], h[p]);
      }
      var d = [];
      d.forEach(function (h) {
        S[h] = a;
      });
      var f = Array(a.length),
        g = [],
        l = 0;
      a.forEach(function (h, p) {
        R.hasOwnProperty(h)
          ? (f[p] = R[h])
          : (g.push(h),
            Q.hasOwnProperty(h) || (Q[h] = []),
            Q[h].push(function () {
              f[p] = R[h];
              ++l;
              l === g.length && c(f);
            }));
      });
      0 === g.length && c(f);
    }
    function U(a, b, c) {
      c = c || {};
      if (!('argPackAdvance' in b))
        throw new TypeError(
          'registerType registeredInstance requires argPackAdvance',
        );
      var d = b.name;
      a || T('type "' + d + '" must have a positive integer typeid pointer');
      if (R.hasOwnProperty(a)) {
        if (c.K) return;
        T("Cannot register type '" + d + "' twice");
      }
      R[a] = b;
      delete S[a];
      Q.hasOwnProperty(a) &&
        ((b = Q[a]),
        delete Q[a],
        b.forEach(function (f) {
          f();
        }));
    }
    var Na = [],
      V = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function Oa(a) {
      4 < a && 0 === --V[a].H && ((V[a] = void 0), Na.push(a));
    }
    function W(a) {
      switch (a) {
        case void 0:
          return 1;
        case null:
          return 2;
        case !0:
          return 3;
        case !1:
          return 4;
        default:
          var b = Na.length ? Na.pop() : V.length;
          V[b] = { H: 1, value: a };
          return b;
      }
    }
    function Pa(a) {
      return this.fromWireType(H[a >> 2]);
    }
    function Qa(a) {
      if (null === a) return 'null';
      var b = typeof a;
      return 'object' === b || 'array' === b || 'function' === b
        ? a.toString()
        : '' + a;
    }
    function Ra(a, b) {
      switch (b) {
        case 2:
          return function (c) {
            return this.fromWireType(pa[c >> 2]);
          };
        case 3:
          return function (c) {
            return this.fromWireType(qa[c >> 3]);
          };
        default:
          throw new TypeError('Unknown float type: ' + a);
      }
    }
    function Sa(a) {
      var b = Function;
      if (!(b instanceof Function))
        throw new TypeError(
          'new_ called with constructor type ' +
            typeof b +
            ' which is not a function',
        );
      var c = Ga(b.name || 'unknownFunctionName', function () {});
      c.prototype = b.prototype;
      c = new c();
      a = b.apply(c, a);
      return a instanceof Object ? a : c;
    }
    function Ta(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Ua(a, b) {
      var c = e;
      if (void 0 === c[a].D) {
        var d = c[a];
        c[a] = function () {
          c[a].D.hasOwnProperty(arguments.length) ||
            T(
              "Function '" +
                b +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ') - expects one of (' +
                c[a].D +
                ')!',
            );
          return c[a].D[arguments.length].apply(this, arguments);
        };
        c[a].D = [];
        c[a].D[d.I] = d;
      }
    }
    function Va(a, b, c) {
      e.hasOwnProperty(a)
        ? ((void 0 === c || (void 0 !== e[a].D && void 0 !== e[a].D[c])) &&
            T("Cannot register public name '" + a + "' twice"),
          Ua(a, a),
          e.hasOwnProperty(c) &&
            T(
              'Cannot register multiple overloads of a function with the same number of arguments (' +
                c +
                ')!',
            ),
          (e[a].D[c] = b))
        : ((e[a] = b), void 0 !== c && (e[a].M = c));
    }
    function Wa(a, b) {
      for (var c = [], d = 0; d < a; d++) c.push(F[(b >> 2) + d]);
      return c;
    }
    function Xa(a, b) {
      0 <= a.indexOf('j') ||
        z('Assertion failed: getDynCaller should only be called with i64 sigs');
      var c = [];
      return function () {
        c.length = arguments.length;
        for (var d = 0; d < arguments.length; d++) c[d] = arguments[d];
        var f;
        -1 != a.indexOf('j')
          ? (f =
              c && c.length
                ? e['dynCall_' + a].apply(null, [b].concat(c))
                : e['dynCall_' + a].call(null, b))
          : (f = J.get(b).apply(null, c));
        return f;
      };
    }
    function Ya(a, b) {
      a = P(a);
      var c = -1 != a.indexOf('j') ? Xa(a, b) : J.get(b);
      'function' !== typeof c &&
        T('unknown function pointer with signature ' + a + ': ' + b);
      return c;
    }
    var Za = void 0;
    function $a(a) {
      a = ab(a);
      var b = P(a);
      X(a);
      return b;
    }
    function bb(a, b) {
      function c(g) {
        f[g] || R[g] || (S[g] ? S[g].forEach(c) : (d.push(g), (f[g] = !0)));
      }
      var d = [],
        f = {};
      b.forEach(c);
      throw new Za(a + ': ' + d.map($a).join([', ']));
    }
    function cb(a, b, c) {
      switch (b) {
        case 0:
          return c
            ? function (d) {
                return oa[d];
              }
            : function (d) {
                return B[d];
              };
        case 1:
          return c
            ? function (d) {
                return E[d >> 1];
              }
            : function (d) {
                return D[d >> 1];
              };
        case 2:
          return c
            ? function (d) {
                return F[d >> 2];
              }
            : function (d) {
                return H[d >> 2];
              };
        default:
          throw new TypeError('Unknown integer type: ' + a);
      }
    }
    var db = {};
    function eb() {
      return 'object' === typeof globalThis
        ? globalThis
        : Function('return this')();
    }
    function fb(a, b) {
      var c = R[a];
      void 0 === c && T(b + ' has unknown type ' + $a(a));
      return c;
    }
    for (var gb = {}, hb = [null, [], []], ib = Array(256), Y = 0; 256 > Y; ++Y)
      ib[Y] = String.fromCharCode(Y);
    Ea = ib;
    Ia = e.BindingError = Ha('BindingError');
    Ja = e.InternalError = Ha('InternalError');
    e.count_emval_handles = function () {
      for (var a = 0, b = 5; b < V.length; ++b) void 0 !== V[b] && ++a;
      return a;
    };
    e.get_first_emval = function () {
      for (var a = 5; a < V.length; ++a) if (void 0 !== V[a]) return V[a];
      return null;
    };
    Za = e.UnboundTypeError = Ha('UnboundTypeError');
    ua.push({
      J: function () {
        jb();
      },
    });
    var lb = {
      o: function () {},
      p: function (a, b, c, d, f) {
        var g = Da(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (l) {
            return !!l;
          },
          toWireType: function (l, h) {
            return h ? d : f;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (l) {
            if (1 === c) var h = oa;
            else if (2 === c) h = E;
            else if (4 === c) h = F;
            else throw new TypeError('Unknown boolean type size: ' + b);
            return this.fromWireType(h[l >> g]);
          },
          F: null,
        });
      },
      v: function (a, b) {
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (c) {
            var d = V[c].value;
            Oa(c);
            return d;
          },
          toWireType: function (c, d) {
            return W(d);
          },
          argPackAdvance: 8,
          readValueFromPointer: Pa,
          F: null,
        });
      },
      m: function (a, b, c) {
        c = Da(c);
        b = P(b);
        U(a, {
          name: b,
          fromWireType: function (d) {
            return d;
          },
          toWireType: function (d, f) {
            if ('number' !== typeof f && 'boolean' !== typeof f)
              throw new TypeError(
                'Cannot convert "' + Qa(f) + '" to ' + this.name,
              );
            return f;
          },
          argPackAdvance: 8,
          readValueFromPointer: Ra(b, c),
          F: null,
        });
      },
      f: function (a, b, c, d, f, g) {
        var l = Wa(b, c);
        a = P(a);
        f = Ya(d, f);
        Va(
          a,
          function () {
            bb('Cannot call ' + a + ' due to unbound types', l);
          },
          b - 1,
        );
        Ka(l, function (h) {
          var p = a,
            k = a;
          h = [h[0], null].concat(h.slice(1));
          var m = f,
            q = h.length;
          2 > q &&
            T(
              "argTypes array size mismatch! Must at least get return value and 'this' types!",
            );
          for (var x = null !== h[1] && !1, C = !1, n = 1; n < h.length; ++n)
            if (null !== h[n] && void 0 === h[n].F) {
              C = !0;
              break;
            }
          var La = 'void' !== h[0].name,
            I = '',
            M = '';
          for (n = 0; n < q - 2; ++n)
            (I += (0 !== n ? ', ' : '') + 'arg' + n),
              (M += (0 !== n ? ', ' : '') + 'arg' + n + 'Wired');
          k =
            'return function ' +
            Fa(k) +
            '(' +
            I +
            ') {\nif (arguments.length !== ' +
            (q - 2) +
            ") {\nthrowBindingError('function " +
            k +
            " called with ' + arguments.length + ' arguments, expected " +
            (q - 2) +
            " args!');\n}\n";
          C && (k += 'var destructors = [];\n');
          var Ma = C ? 'destructors' : 'null';
          I = 'throwBindingError invoker fn runDestructors retType classParam'.split(
            ' ',
          );
          m = [T, m, g, Ta, h[0], h[1]];
          x &&
            (k += 'var thisWired = classParam.toWireType(' + Ma + ', this);\n');
          for (n = 0; n < q - 2; ++n)
            (k +=
              'var arg' +
              n +
              'Wired = argType' +
              n +
              '.toWireType(' +
              Ma +
              ', arg' +
              n +
              '); // ' +
              h[n + 2].name +
              '\n'),
              I.push('argType' + n),
              m.push(h[n + 2]);
          x && (M = 'thisWired' + (0 < M.length ? ', ' : '') + M);
          k +=
            (La ? 'var rv = ' : '') +
            'invoker(fn' +
            (0 < M.length ? ', ' : '') +
            M +
            ');\n';
          if (C) k += 'runDestructors(destructors);\n';
          else
            for (n = x ? 1 : 2; n < h.length; ++n)
              (q = 1 === n ? 'thisWired' : 'arg' + (n - 2) + 'Wired'),
                null !== h[n].F &&
                  ((k += q + '_dtor(' + q + '); // ' + h[n].name + '\n'),
                  I.push(q + '_dtor'),
                  m.push(h[n].F));
          La && (k += 'var ret = retType.fromWireType(rv);\nreturn ret;\n');
          I.push(k + '}\n');
          h = Sa(I).apply(null, m);
          n = b - 1;
          if (!e.hasOwnProperty(p))
            throw new Ja('Replacing nonexistant public symbol');
          void 0 !== e[p].D && void 0 !== n
            ? (e[p].D[n] = h)
            : ((e[p] = h), (e[p].I = n));
          return [];
        });
      },
      c: function (a, b, c, d, f) {
        function g(k) {
          return k;
        }
        b = P(b);
        -1 === f && (f = 4294967295);
        var l = Da(c);
        if (0 === d) {
          var h = 32 - 8 * c;
          g = function (k) {
            return (k << h) >>> h;
          };
        }
        var p = -1 != b.indexOf('unsigned');
        U(a, {
          name: b,
          fromWireType: g,
          toWireType: function (k, m) {
            if ('number' !== typeof m && 'boolean' !== typeof m)
              throw new TypeError(
                'Cannot convert "' + Qa(m) + '" to ' + this.name,
              );
            if (m < d || m > f)
              throw new TypeError(
                'Passing a number "' +
                  Qa(m) +
                  '" from JS side to C/C++ side to an argument of type "' +
                  b +
                  '", which is outside the valid range [' +
                  d +
                  ', ' +
                  f +
                  ']!',
              );
            return p ? m >>> 0 : m | 0;
          },
          argPackAdvance: 8,
          readValueFromPointer: cb(b, l, 0 !== d),
          F: null,
        });
      },
      b: function (a, b, c) {
        function d(g) {
          g >>= 2;
          var l = H;
          return new f(G, l[g + 1], l[g]);
        }
        var f = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ][b];
        c = P(c);
        U(
          a,
          {
            name: c,
            fromWireType: d,
            argPackAdvance: 8,
            readValueFromPointer: d,
          },
          { K: !0 },
        );
      },
      i: function (a, b) {
        b = P(b);
        var c = 'std::string' === b;
        U(a, {
          name: b,
          fromWireType: function (d) {
            var f = H[d >> 2];
            if (c)
              for (var g = d + 4, l = 0; l <= f; ++l) {
                var h = d + 4 + l;
                if (l == f || 0 == B[h]) {
                  if (g) {
                    for (var p = g + (h - g), k = g; !(k >= p) && B[k]; ) ++k;
                    g = ea.decode(B.subarray(g, k));
                  } else g = '';
                  if (void 0 === m) var m = g;
                  else (m += String.fromCharCode(0)), (m += g);
                  g = h + 1;
                }
              }
            else {
              m = Array(f);
              for (l = 0; l < f; ++l) m[l] = String.fromCharCode(B[d + 4 + l]);
              m = m.join('');
            }
            X(d);
            return m;
          },
          toWireType: function (d, f) {
            f instanceof ArrayBuffer && (f = new Uint8Array(f));
            var g = 'string' === typeof f;
            g ||
              f instanceof Uint8Array ||
              f instanceof Uint8ClampedArray ||
              f instanceof Int8Array ||
              T('Cannot pass non-string to std::string');
            var l = (c && g
                ? function () {
                    for (var k = 0, m = 0; m < f.length; ++m) {
                      var q = f.charCodeAt(m);
                      55296 <= q &&
                        57343 >= q &&
                        (q =
                          (65536 + ((q & 1023) << 10)) |
                          (f.charCodeAt(++m) & 1023));
                      127 >= q
                        ? ++k
                        : (k = 2047 >= q ? k + 2 : 65535 >= q ? k + 3 : k + 4);
                    }
                    return k;
                  }
                : function () {
                    return f.length;
                  })(),
              h = kb(4 + l + 1);
            H[h >> 2] = l;
            if (c && g) fa(f, h + 4, l + 1);
            else if (g)
              for (g = 0; g < l; ++g) {
                var p = f.charCodeAt(g);
                255 < p &&
                  (X(h),
                  T('String has UTF-16 code units that do not fit in 8 bits'));
                B[h + 4 + g] = p;
              }
            else for (g = 0; g < l; ++g) B[h + 4 + g] = f[g];
            null !== d && d.push(X, h);
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Pa,
          F: function (d) {
            X(d);
          },
        });
      },
      h: function (a, b, c) {
        c = P(c);
        if (2 === b) {
          var d = ia;
          var f = ja;
          var g = ka;
          var l = function () {
            return D;
          };
          var h = 1;
        } else
          4 === b &&
            ((d = la),
            (f = ma),
            (g = na),
            (l = function () {
              return H;
            }),
            (h = 2));
        U(a, {
          name: c,
          fromWireType: function (p) {
            for (var k = H[p >> 2], m = l(), q, x = p + 4, C = 0; C <= k; ++C) {
              var n = p + 4 + C * b;
              if (C == k || 0 == m[n >> h])
                (x = d(x, n - x)),
                  void 0 === q
                    ? (q = x)
                    : ((q += String.fromCharCode(0)), (q += x)),
                  (x = n + b);
            }
            X(p);
            return q;
          },
          toWireType: function (p, k) {
            'string' !== typeof k &&
              T('Cannot pass non-string to C++ string type ' + c);
            var m = g(k),
              q = kb(4 + m + b);
            H[q >> 2] = m >> h;
            f(k, q + 4, m + b);
            null !== p && p.push(X, q);
            return q;
          },
          argPackAdvance: 8,
          readValueFromPointer: Pa,
          F: function (p) {
            X(p);
          },
        });
      },
      q: function (a, b) {
        b = P(b);
        U(a, {
          L: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      g: Oa,
      n: function (a) {
        if (0 === a) return W(eb());
        var b = db[a];
        a = void 0 === b ? P(a) : b;
        return W(eb()[a]);
      },
      j: function (a) {
        4 < a && (V[a].H += 1);
      },
      k: function (a, b, c, d) {
        a || T('Cannot use deleted val. handle = ' + a);
        a = V[a].value;
        var f = gb[b];
        if (!f) {
          f = '';
          for (var g = 0; g < b; ++g) f += (0 !== g ? ', ' : '') + 'arg' + g;
          var l =
            'return function emval_allocator_' +
            b +
            '(constructor, argTypes, args) {\n';
          for (g = 0; g < b; ++g)
            l +=
              'var argType' +
              g +
              " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " +
              g +
              '], "parameter ' +
              g +
              '");\nvar arg' +
              g +
              ' = argType' +
              g +
              '.readValueFromPointer(args);\nargs += argType' +
              g +
              "['argPackAdvance'];\n";
          f = new Function(
            'requireRegisteredType',
            'Module',
            '__emval_register',
            l +
              ('var obj = new constructor(' +
                f +
                ');\nreturn __emval_register(obj);\n}\n'),
          )(fb, e, W);
          gb[b] = f;
        }
        return f(a, c, d);
      },
      e: function () {
        z();
      },
      t: function (a, b, c) {
        B.copyWithin(a, b, b + c);
      },
      d: function (a) {
        a >>>= 0;
        var b = B.length;
        if (2147483648 < a) return !1;
        for (var c = 1; 4 >= c; c *= 2) {
          var d = b * (1 + 0.2 / c);
          d = Math.min(d, a + 100663296);
          d = Math.max(16777216, a, d);
          0 < d % 65536 && (d += 65536 - (d % 65536));
          a: {
            try {
              A.grow((Math.min(2147483648, d) - G.byteLength + 65535) >>> 16);
              ra(A.buffer);
              var f = 1;
              break a;
            } catch (g) {}
            f = void 0;
          }
          if (f) return !0;
        }
        return !1;
      },
      u: function () {
        return 0;
      },
      r: function () {},
      l: function (a, b, c, d) {
        for (var f = 0, g = 0; g < c; g++) {
          for (
            var l = F[(b + 8 * g) >> 2], h = F[(b + (8 * g + 4)) >> 2], p = 0;
            p < h;
            p++
          ) {
            var k = B[l + p],
              m = hb[a];
            if (0 === k || 10 === k) {
              for (k = 0; m[k] && !(NaN <= k); ) ++k;
              k = ea.decode(
                m.subarray ? m.subarray(0, k) : new Uint8Array(m.slice(0, k)),
              );
              (1 === a ? ca : w)(k);
              m.length = 0;
            } else m.push(k);
          }
          f += h;
        }
        F[d >> 2] = f;
        return 0;
      },
      a: A,
      s: function () {},
    };
    (function () {
      function a(f) {
        e.asm = f.exports;
        J = e.asm.w;
        K--;
        e.monitorRunDependencies && e.monitorRunDependencies(K);
        0 == K &&
          (null !== ya && (clearInterval(ya), (ya = null)),
          L && ((f = L), (L = null), f()));
      }
      function b(f) {
        a(f.instance);
      }
      function c(f) {
        return Ca()
          .then(function (g) {
            return WebAssembly.instantiate(g, d);
          })
          .then(f, function (g) {
            w('failed to asynchronously prepare wasm: ' + g);
            z(g);
          });
      }
      var d = { a: lb };
      K++;
      e.monitorRunDependencies && e.monitorRunDependencies(K);
      if (e.instantiateWasm)
        try {
          return e.instantiateWasm(d, a);
        } catch (f) {
          return (
            w('Module.instantiateWasm callback failed with error: ' + f), !1
          );
        }
      (function () {
        return y ||
          'function' !== typeof WebAssembly.instantiateStreaming ||
          za() ||
          'function' !== typeof fetch
          ? c(b)
          : fetch(N, { credentials: 'same-origin' }).then(function (f) {
              return WebAssembly.instantiateStreaming(f, d).then(b, function (
                g,
              ) {
                w('wasm streaming compile failed: ' + g);
                w('falling back to ArrayBuffer instantiation');
                return c(b);
              });
            });
      })().catch(r);
      return {};
    })();
    var jb = (e.___wasm_call_ctors = function () {
        return (jb = e.___wasm_call_ctors = e.asm.x).apply(null, arguments);
      }),
      kb = (e._malloc = function () {
        return (kb = e._malloc = e.asm.y).apply(null, arguments);
      }),
      X = (e._free = function () {
        return (X = e._free = e.asm.z).apply(null, arguments);
      }),
      ab = (e.___getTypeName = function () {
        return (ab = e.___getTypeName = e.asm.A).apply(null, arguments);
      });
    e.___embind_register_native_and_builtin_types = function () {
      return (e.___embind_register_native_and_builtin_types = e.asm.B).apply(
        null,
        arguments,
      );
    };
    e.dynCall_jiji = function () {
      return (e.dynCall_jiji = e.asm.C).apply(null, arguments);
    };
    var Z;
    L = function mb() {
      Z || nb();
      Z || (L = mb);
    };
    function nb() {
      function a() {
        if (!Z && ((Z = !0), (e.calledRun = !0), !da)) {
          O(ua);
          O(va);
          aa(e);
          if (e.onRuntimeInitialized) e.onRuntimeInitialized();
          if (e.postRun)
            for (
              'function' == typeof e.postRun && (e.postRun = [e.postRun]);
              e.postRun.length;

            ) {
              var b = e.postRun.shift();
              wa.unshift(b);
            }
          O(wa);
        }
      }
      if (!(0 < K)) {
        if (e.preRun)
          for (
            'function' == typeof e.preRun && (e.preRun = [e.preRun]);
            e.preRun.length;

          )
            xa();
        O(ta);
        0 < K ||
          (e.setStatus
            ? (e.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  e.setStatus('');
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    e.run = nb;
    if (e.preInit)
      for (
        'function' == typeof e.preInit && (e.preInit = [e.preInit]);
        0 < e.preInit.length;

      )
        e.preInit.pop()();
    noExitRuntime = !0;
    nb();

    return Module.ready;
  };
})();
export default Module;
