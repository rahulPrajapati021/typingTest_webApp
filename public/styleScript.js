let clientHeight = window.innerHeight;

setInterval(() => {
    document.querySelector(".Main").style.height = (innerHeight + "px");
}, 10);