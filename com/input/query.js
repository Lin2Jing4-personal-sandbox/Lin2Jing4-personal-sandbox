const $ = id => document.getElementById(id)

const appid =
[
'26LQEH-YT3P6T3YY9',
'K49A6Y-4REWHGRWW6',
'J77PG9-UY8A3WQ2PG',
'P3WLYY-2G9GA6RQGE',
'P7JH3K-27RHWR53JQ',
'L349HV-29P5JV8Y7J',
'77PP56-XLQK5GKUAA',
]

const url = () =>
`
https://cors-anywhere.herokuapp.com/
http://api.wolframalpha.com/v2/query?
&appid=${ appid[Date.now() % appid.length] }
&input=${ encodeURIComponent($('input').value) }
&podstate=Step-by-step solution
&podstate=Step-by-step
&podstate=Show all steps
&scantimeout=20
`

function query() {
    $('paragraph').prepend(' please wait')
    fetch(
        url()
    ).then(
        xml => xml.text()
    ).then(
        xml => xml.replace(/plaintext/g, 'pre')
    ).then(
        xml => xml.replace(/<pod title='/g, '<h1>')
    ).then(
        xml => xml.replace(/'\s*s/g, '</h1><!')
    ).then(
        xml => $('paragraph').innerHTML = xml
    )
}

if (window.location.search.includes('?i=')) {
    $('input').value = decodeURIComponent( window.location.search.substring(3).replace(/&.*/, '') )
    query()
}

document.getElementById('button').addEventListener('click', query)
