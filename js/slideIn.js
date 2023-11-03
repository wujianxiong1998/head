var DISTANCE = 160;
var DURATION = 900;
var animationMap = new WeakMap();
const ob = new IntersectionObserver(function (entries) {
  for (var entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target);
      animation.play();
      ob.unobserve(entry.target);
    }
  }
});

function isBelowViewport(dom) {
  var rect = dom.getBoundingClientRect();
  return rect.top > window.innerHeight;
}

window.addEventListener('load', function () {
  slideLeft();
  slideRight();
  slideTop();
  slideIn();
})

window.addEventListener('unload', function () {
  $(".slideIn").each(function (ids, dom) {
    ob.unobserve($(dom)[0]);
  })
})

/**
 * 给dom添加动画
 */
function slideTop() {
  $(".slideTop").each(function (ids, dom) {
    var animation = $(dom)[0].animate([
      {
        transform: `translateY(0)`,
      },
      {
        transform: `translateY(-10px)`,
      },
      {
        transform: `translateY(0)`,
      },
    ], {
      duration: 1400,
      iterations: Infinity,
    });
  });
}
function slideLeft() {
  $(".slideLeft").each(function (ids, dom) {
    var animation = $(dom)[0].animate([
      {
        transform: `translateX(-${DISTANCE}px)`,
        opacity: 0.5
      },
      {
        transform: `translateX(0)`,
        opacity: 1
      },
    ], {
      duration: DURATION,
      easing: 'ease',
    });
  });
}
function slideRight() {
  $(".slideRight").each(function (ids, dom) {
    var animation = $(dom)[0].animate([
      {
        transform: `translateX(${DISTANCE}px)`,
        opacity: 0.5
      },
      {
        transform: `translateX(0)`,
        opacity: 1
      },
    ], {
      duration: DURATION,
      easing: 'ease',
    });
  });
}
function slideIn() {
  $(".slideIn").each(function (ids, dom) {
    if (!isBelowViewport($(dom)[0]) && animationMap.get($(dom)[0])) {
      return;
    }
    var animation = $(dom)[0].animate([
      {
        transform: `translateY(${DISTANCE}px)`,
        opacity: 0.5
      },
      {
        transform: `translateY(0)`,
        opacity: 1
      },
    ], {
      duration: DURATION,
      easing: 'ease',
    });
    animation.pause();
    animationMap.set($(dom)[0], animation);
    ob.observe($(dom)[0]);
  });
}