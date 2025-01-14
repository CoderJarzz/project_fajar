const btnMode = document.querySelector(".btnMode")

function hp(index) {
    const navHp = document.querySelectorAll('.hp > .menu > nav > a[href^="#"]')
    console.log(navHp)
    navHp.forEach(item =>{
        item.classList.remove("hovered")
    })
    navHp[index].classList.add("hovered")
}
btnMode.addEventListener('change', function() {
    if (this.checked) {
        console.log('Checkbox tercentang')
        document.documentElement.style.setProperty('--mode', '#d8dbe0')
        document.documentElement.style.setProperty('--lawan', '#28292c')
    } else {
        console.log('Checkbox tidak tercentang')
        document.documentElement.style.setProperty('--mode', '#28292c')
        document.documentElement.style.setProperty('--lawan', '#d8dbe0')
    }
})

window.addEventListener('scroll', function() {
    const links = document.querySelectorAll('.pc > nav > a[href^="#"]')
    let sectionHovered = false
    links.forEach(link => {
        if (link.id != "navHp") link.classList.remove('hovered')
        const targetId = link.getAttribute('href').substring(1)
        const section = document.getElementById(targetId)
        if (section) {
            const bounding = section.getBoundingClientRect()
            if (bounding.top <= window.innerHeight-10 && bounding.bottom >= 10 && !sectionHovered) {
                link.classList.add('hovered')
                sectionHovered = true
            }
        }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hidden')

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    }

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)
            }
        })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(section => {
        observer.observe(section)
    })

    document.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', function (e) {
            const href = this.getAttribute('href')
            const notif = document.querySelector(".notif")

            if (href.startsWith('#')) {
                try {
                    const section = document.querySelector(href)
                    if (section) {
                        
                        e.preventDefault()
                        section.scrollIntoView({ behavior: 'smooth' })
                    } else {
                        e.preventDefault()
                        if (item.id == "navHp") return;
                        if (document.querySelector('.notif')) {
                            notif.classList.add('visible')
                            setTimeout(() => {
                                notif.classList.remove('visible')
                            }, 2000);
                        }
                    }
                } catch (error) {
                    e.preventDefault()
                    if (item.id == "navHp") return;
                    if (document.querySelector('.notif')) {
                        notif.classList.add('visible')
                        setTimeout(() => {
                            notif.classList.remove('visible')
                        }, 2000);
                    }
                }
            }
        })
    })
})
