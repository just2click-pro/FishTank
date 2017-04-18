  aquaFun.utils = (function () {
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
      element = element[0].getBoundingClientRect();
      var viewport = getViewport();
      return {
        left: element.left + viewport.vw * 0.02,
        top: element.top + viewport.vh * 0.05,
        right: element.right - viewport.vw * 0.07,
        bottom: element.bottom - viewport.vh * 0.05
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

    // Return a percentage value limited
    function limitedPercentage (props) {
      var result = (Math.floor((props.value / props.maxValue) * 100));
      if (result > props.topLimit) {
        result = props.topLimit;
      } else if (result < props.lowerLimit) {
        result = props.lowerLimit;
      }
      return result;

    }

    return {
      random: random,
      guid: guid,
      viewport: getViewport,
      props: getElementProps,
      percentage: limitedPercentage
    };
  })();
