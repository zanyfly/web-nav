const $sitelist = $('.sitelist')
const jsonstring = localStorage.getItem('list')
console.log(jsonstring)
const list = JSON.parse(jsonstring) || [
    { logo: 'A', link: 'https://www.acfun.cn/', name: "acfun" },
    { logo: 'B', link: 'https://www.bilibili.com/', name: 'bilibili' }
]

const urlPath = (urlString) => {
    if (urlString.length == 0) {
        return "EMPTY"
    }
    const url = new URL(urlString)
    return url.host.split('.').slice(0, -1).join('.')
}

const updateList = () => {
    $sitelist.find('li:not(.last)').remove()
    list.forEach((item, index) => {
        let $li = $(`
        <li>
            <div class="site">
                <div class="logo">${item.logo || ""}
                </div>
                <div class="link">${item.name || ""}</div>
                <div class="delete">              
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-delete"></use>
                    </svg>
                </div>
            </div>
    </li>
        `)
        $('.last').before($li)
        $li.on('click', () => {
            window.open(item.link)
        })
        $li.on('click', '.delete', (e) => {
            e.stopPropagation()
            list.splice(index, 1)
            updateList()
        })

    });
}

updateList()

$('.addbutton').click(() => {
    let urlString = window.prompt('input the website ')
    if (urlString.indexOf('http') !== 0) {
        urlString = 'https://' + urlString
    }
    list.push({ logo: urlPath(urlString)[0].toUpperCase(), link: urlString, name: urlPath(urlString) })
    updateList()
})

window.onbeforeunload = () => {
    const jsonstring = JSON.stringify(list)
    localStorage.setItem('list', jsonstring)
}