
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach((dropdownToggle, index) => {
        dropdownToggle.addEventListener('click', (e) => {
            if(e.target.classList.contains('show')){
                e.target.classList.remove('show')
                dropdownMenus[index].classList.remove('show')
                dropdownMenus[index].style = "" 
                return
            }
            dropdownMenus.forEach((dropdownMenu, i) => {
                if(index !== i) {
                    dropdownMenu.classList.remove('show')
                    dropdownMenu.style = ""
                    dropdownToggles[i].classList.remove('show');
                }
            })
            e.target.classList.add('show')
            dropdownMenus[index].classList.add('show')
            dropdownMenus[index].style = "position:absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 40px)"
        })
    })