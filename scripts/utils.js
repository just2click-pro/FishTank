  var utils = (function () {
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    function getElementProps(element) {
      var elementCopy = element,
        top = 0, left = 0, height = 0, width = 0;

      if (document.getElementById || document.all) {
        height = element.offsetHeight;
        width = element.offsetWidth;

        do  {
            left += element.offsetLeft-element.scrollLeft;
            top += element.offsetTop-element.scrollTop;
            element = element.offsetParent;
            elementCopy = elementCopy.parentNode;
            while (elementCopy != element) {
                left -= elementCopy.scrollLeft;
                top -= elementCopy.scrollTop;
                elementCopy = elementCopy.parentNode;
            }
        } while (element.offsetParent);

      } else if (document.layers) {
        top += element.y;
        left += element.x;
      }
      return {
        top: top,
        left: left,
        height: height,
        width: width
      };
    }

    function getViewport() {
      var viewPortWidth;
      var viewPortHeight;

      // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
      if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
      }

      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
      else if (typeof document.documentElement != 'undefined' &&
        typeof document.documentElement.clientWidth !='undefined' &&
        document.documentElement.clientWidth !== 0) {
          viewPortWidth = document.documentElement.clientWidth;
          viewPortHeight = document.documentElement.clientHeight;
      }
      // older versions of IE
      else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
        viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
      }
      return {
        vw: viewPortWidth,
        vh: viewPortHeight
      };
    }

    return {
      random: random,
      guid: guid,
      viewport: getViewport,
      props: getElementProps
    };
  })();
