// nav
window.onscroll = function(){
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if(window.pageYOffset > fixedNav){
        header.classList.add('z-[99999]','bg-lb', 'bg-opacity-70', 'backdrop-blur-sm','shadow-xl');
        header.styleList.add("box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)");
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    }else{
        header.classList.remove('z-[99999]','bg-lb', 'bg-opacity-70', 'backdrop-blur-sm','shadow-xl');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
};