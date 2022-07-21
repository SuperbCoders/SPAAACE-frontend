document.addEventListener('DOMContentLoaded', function () {
    // height 100vh fix for IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // resize
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    // inputmask
    Inputmask().mask(document.querySelectorAll('input'))

    // textarea
    document.querySelectorAll('textarea').forEach(el => {
        el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
        el.classList.add('auto');
        el.addEventListener('input', e => {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 'px';
        });
    });
    
    // mobile menu
    const hamburger = document.getElementById('menu-toggle')
    const mobileMenu = document.getElementById('mobile-menu')
    const mobileMenuClose = document.querySelector('.mobile-menu__close')

    if (hamburger && mobileMenu && mobileMenuClose) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            mobileMenu.classList.add('mobile-menu--active')
            document.body.classList.add('scroll-disabled')
        })

        mobileMenuClose.addEventListener('click', (event) => {
            event.preventDefault()

            mobileMenu.classList.remove('mobile-menu--active')
            document.body.classList.remove('scroll-disabled')
        })
    }

    // on hover view
    const onHoverLink = document.querySelectorAll('.on-hover')

    if (onHoverLink) {
        onHoverLink.forEach((item, i) => {
            item.addEventListener('mouseover', () => {
                document.querySelectorAll('.on-hover-view').forEach((child) => child.classList.remove('active'))
                document.querySelectorAll('.on-hover-view')[i].classList.add('active')
            })
            
            item.addEventListener('mouseout', () => {
                document.querySelectorAll('.on-hover-view').forEach((child) => child.classList.remove('active'))
            })
        })
    }

    // scroll
    const header = document.getElementById('header')
    const fixedLogotype = document.getElementById('fixed-logotype')
    const imageBlocks = document.querySelectorAll('.image')
    let prevScrollpos = window.pageYOffset
    let coordOffsetTopHeaderCounter = 0
    let coordOffsetTopLogotypeCounter = 0

    if (imageBlocks) {
        let coordOffsetTopHeaderCounter = imageBlocks.length
        let coordOffsetTopLogotypeCounter = imageBlocks.length

        setTimeout(() => {
            imageBlocks.forEach((item) => {
                // header
                if (!(window.pageYOffset >= (getCoords(item).top - header.getBoundingClientRect().height - Number(20)) && window.pageYOffset <= (getCoords(item).top + item.getBoundingClientRect().height - header.getBoundingClientRect().height - Number(20)))) {
                    coordOffsetTopHeaderCounter--
                }
    
                if (coordOffsetTopHeaderCounter > 0) {
                    header.classList.add('header--white')
                } else {
                    header.classList.remove('header--white')
                }
    
                // logotype
                if (!(window.pageYOffset >= (getCoords(item).top - document.documentElement.clientHeight + Number(20)) && window.pageYOffset <= (getCoords(item).top + item.getBoundingClientRect().height - document.documentElement.clientHeight + Number(20)))) {
                    coordOffsetTopLogotypeCounter--
                }
    
                if (coordOffsetTopLogotypeCounter > 0) {
                    fixedLogotype.classList.add('fixed-logotype--white')
                } else {
                    fixedLogotype.classList.remove('fixed-logotype--white')
                }
            })
        }, 200)
    }

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function headerScrollUp() {
        if (imageBlocks) {
            coordOffsetTopHeaderCounter = imageBlocks.length

            imageBlocks.forEach(item => {
                if (!(window.pageYOffset >= (getCoords(item).top - header.getBoundingClientRect().height) && window.pageYOffset <= (getCoords(item).top + item.getBoundingClientRect().height - header.getBoundingClientRect().height))) {
                    coordOffsetTopHeaderCounter--
                }

                if (coordOffsetTopHeaderCounter > 0) {
                    header.classList.add('header--white')
                    fixedLogotype.classList.add('fixed-logotype--white')
                } else {
                    header.classList.remove('header--white')
                    fixedLogotype.classList.remove('fixed-logotype--white')
                }
            })
        }
    }

    function headerScrollDown() {
        if (imageBlocks) {
            coordOffsetTopHeaderCounter = imageBlocks.length

            imageBlocks.forEach(item => {
                if (!(window.pageYOffset >= (getCoords(item).top - header.getBoundingClientRect().height - Number(20)) && window.pageYOffset <= (getCoords(item).top + item.getBoundingClientRect().height - header.getBoundingClientRect().height - Number(20)))) {
                    coordOffsetTopHeaderCounter--
                }

                if (coordOffsetTopHeaderCounter > 0) {
                    header.classList.add('header--white')
                } else {
                    header.classList.remove('header--white')
                }
            })
        }
    }

    function fixedLogotypeScrollUp() {
        if (imageBlocks) {
            coordOffsetTopLogotypeCounter = imageBlocks.length

            imageBlocks.forEach(item => {
                if (!(window.pageYOffset >= (getCoords(item).top - document.documentElement.clientHeight + Number(20)) && window.pageYOffset <= (getCoords(item).top + item.getBoundingClientRect().height - document.documentElement.clientHeight + Number(20)))) {
                    coordOffsetTopLogotypeCounter--
                }

                if (coordOffsetTopLogotypeCounter > 0) {
                    fixedLogotype.classList.add('fixed-logotype--white')
                } else {
                    fixedLogotype.classList.remove('fixed-logotype--white')
                }
            })
        }
    }

    function fixedLogotypeScrollDown() {
        if (imageBlocks) {
            coordOffsetTopLogotypeCounter = imageBlocks.length

            imageBlocks.forEach(item => {
                if (!(window.pageYOffset >= (getCoords(item).top - document.documentElement.clientHeight + Number(20)) && window.pageYOffset <= (getCoords(item).top + item.getBoundingClientRect().height - document.documentElement.clientHeight + Number(20)))) {
                    coordOffsetTopLogotypeCounter--
                }

                if (coordOffsetTopLogotypeCounter > 0) {
                    fixedLogotype.classList.add('fixed-logotype--white')
                } else {
                    fixedLogotype.classList.remove('fixed-logotype--white')
                }
            })
        }
    }

    window.addEventListener('scroll', () => {
        let currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) { // if up
            if (header) {
                headerScrollUp()
            }
            if (fixedLogotype) {
                fixedLogotypeScrollUp()
            }
        } else { // if down
            if (header) {
                headerScrollDown()
            }
            if (fixedLogotype) {
                fixedLogotypeScrollDown()
            }
        }

        prevScrollpos = currentScrollPos;
    })
});