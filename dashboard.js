async function getWilayah() {
    const UrlKelurahan = "https://script.google.com/macros/s/AKfycbxxWf-43TUg5XvBOes_r89pANhi6fCOQgqhF_SwEmjJMWSIvv9BSDEsX2ZCpUGQDMRg/exec";

    let str = '';
    await fetch(UrlKelurahan)
        .then(datas => datas.json())
        .then(datas => {
            const optionElemen = document.createElement('option');
            optionElemen.value = '';
            optionElemen.innerHTML = '---Pilih Kelurahan---';    
            str += optionElemen.outerHTML;
            if (datas.result === 'success') {
                for (let k of datas.data) {
                    if (k[0] != 'Kelurahan') {
                        let optionElemen = document.createElement('option');
                        optionElemen.value = `${k[0]} - ${k[1]}`;
                        optionElemen.innerHTML = k[0];
                        str += optionElemen.outerHTML;
                    }
                }
            }
    });

    return str;
}

async function getPasar() {
    const urlDataPasar = "https://script.google.com/macros/s/AKfycbwzVP84YKO62g10ShP-DKAqmOieh8VMJv_8L1FG6ZldOUNPnNFTTZgEKid6d8B6Dx6n/exec";

    let str = '';
    await fetch(urlDataPasar)
    .then(datas => datas.json())
    .then(datas => {
        const optionElemen = document.createElement('option');
        optionElemen.value = '';
        optionElemen.innerHTML = '---Pilih Pasar---';
        str += optionElemen.outerHTML;

        if (datas.result === 'success') {
            for (let k of datas.data) {
                if (k[0] != 'Daftar Pasar') {
                    let optionElemen = document.createElement('option');
                    optionElemen.value = k[0];
                    optionElemen.innerHTML = k[0];
                    str += optionElemen.outerHTML;
                }
            }
        }
    });

    return str;

}

function clearResultDisplayer() {
    document.querySelector(".resultDisplayer").innerHTML = "";
}

async function getTotalStat(apiUrl, sortByPersen = false) {
    let a = {};
    let sortedBlmTera = [];
    await fetch(apiUrl, {
        method : 'GET'
    })
    .then(data => data.json())
    .then(data => {
        a = data;
    });
    if (sortByPersen === true) {
        let persenobj = {};
        for (let k in a.uttpBlmTeraObj) {
            persenobj[k] = a.uttpBlmTeraObj[k]/a.uttpAllObj[k]*100;
        }

        sortedBlmTera = Object.keys(persenobj).sort((k1,k2) => persenobj[k2] - persenobj[k1]);

    } else {
        let blmtera = Object.keys(a.uttpBlmTeraObj);
        sortedBlmTera = blmtera.sort((key1, key2) => a.uttpBlmTeraObj[key2] - a.uttpBlmTeraObj[key1]);
    }

    return [a,sortedBlmTera];
}

async function getTotalStatPerPasar(namaPasar, sortByPersen = false) {

    const apiUrl = "https://script.google.com/macros/s/AKfycbyFL2mlam8gBdWGGyMjJH8PKoz0-lHZgGtOEWZK7E8rpFX2nQWWA-YPNkqzlCrC8mNS/exec";
    
    let a = {};
    let sortedBlmTera = [];
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'pasar' : namaPasar})
    })
    .then(data => data.json())
    .then(data => {
        a = data;
    });

    if (sortByPersen === true) {
        let persenobj = {};
        for (let k in a.uttpBlmTeraObj) {
            persenobj[k] = a.uttpBlmTeraObj[k]/a.uttpAllObj[k]*100;
        }
        //console.log(persenobj);
        //let sortedPersen = Object.keys(persenobj).sort((k1,k2) => persenobj[k2] - persenobj[k1]);
        //console.log(sortedPersen);
        sortedBlmTera = Object.keys(persenobj).sort((k1,k2) => persenobj[k2] - persenobj[k1]);
    } else {
        let blmtera = Object.keys(a.uttpBlmTeraObj);
        sortedBlmTera = blmtera.sort((key1, key2) => a.uttpBlmTeraObj[key2] - a.uttpBlmTeraObj[key1]);
    }

    return [a,sortedBlmTera];

}

function showinformation(kontainer, srcData, kelasTbl1='firstTable', kelasTbl2='secondTable') {
    kontainer.innerHTML += `<table class=${kelasTbl1}>
        <tr><td>Total Uttp</td><td>${srcData[0].totalStat.totalUttp} unit</td></tr>
        <tr><td>Total Uttp Sdh Tera</td><td>${srcData[0].totalStat.totalUttpSdhTera} unit</td></tr>
        <tr><td>Persen Uttp Sdh Tera</td><td>${srcData[0].totalStat.persenSdhTera} %</td></tr>
    </table>`;
    
    let str = `<table class=${kelasTbl2}><tr><th colspan=3 align="center">Jml Uttp Yang Belum Tera<th></tr><tr><th></th><th style='text-align : right;'><img src='asc.png'></th><th></th></tr>`;

    for (k of srcData[1]) {
        let persen = (srcData[0].uttpBlmTeraObj[k]/srcData[0].uttpAllObj[k])*100
        str += `<tr><td>${k}</td><td style='text-align : right;'>${persen.toFixed(2)} %</td><td style='text-align : right;'>${srcData[0].uttpBlmTeraObj[k]}/${srcData[0].uttpAllObj[k]} unit</td></tr>`;
    }
    str += `</table>`;
    kontainer.innerHTML += str;             
}

(async function main() {
    let loadingTotPsr = document.querySelector('.ld1');
    loadingTotPsr.hidden = false;
    
    let dataTotal = await getTotalStat("https://script.google.com/macros/s/AKfycbzgTJb8Uvva00j2KNLDFGTHtdRAVK__b52rWC5f9AIaeoMgmAdR-UZ7wBaOaNRgI-CW/exec");
    loadingTotPsr.hidden = true;
    let pasarDiv = document.getElementsByClassName('sumChild')[0];
    showinformation(pasarDiv, dataTotal);


    let loadingTotWly = document.querySelector('.ld2');
    loadingTotWly.hidden = false;
    
    let dataTotalWilayah = await getTotalStat("https://script.google.com/macros/s/AKfycbwFc9WnhE6vBcyStokY4Z3gdmsSir1qGggQ-xKS2jnKdOf4xfyLnwJRZBIciJKMI-IB1A/exec");
    loadingTotWly.hidden = true;
    let wilayahDiv = document.getElementsByClassName('sumChild')[1];
    showinformation(wilayahDiv, dataTotalWilayah);


    let kategori = document.getElementById("kat");
    kategori.addEventListener('change', async () => {
        let loading = document.querySelector('.ld0');
        loading.hidden = false;
        clearResultDisplayer();

        switch($("#kat").val()) {
            case 'wilayah' :
                document.getElementById('detailKat').innerHTML = await getWilayah(); 
                loading.hidden = true;
                break;

            case 'pasar' :
                document.getElementById('detailKat').innerHTML = await getPasar();
                loading.hidden = true;
                break;

            case '' :
                loading.hidden = true;
                document.getElementById('detailKat').innerHTML = `<option value=''>-- No Kategori Selected --</option>`;
                break;
        }

        $("#detailKat").val('').trigger('change');

        let detailKat = document.getElementById('detailKat');
        detailKat.addEventListener('change', async () => {
            loading.hidden = false;
            clearResultDisplayer();
            let resultDisplayer = document.querySelector('.resultDisplayer');
            switch($("#kat").val()) {
                case 'wilayah':
                    setTimeout(() => {
                        let a = $("#detailKat").val().split(" - ");
                        document.querySelector('.resultDisplayer').innerHTML = `Kel. ${a[0]} / Kec. ${a[1]}`; 
                        loading.hidden = true;
                    }, 1800);
                    break;
                case 'pasar':
                    setTimeout(async () => {
                        let dataTotalPerPasar = await getTotalStatPerPasar($("#detailKat").val());
                        resultDisplayer.innerHTML += `<h5>${$("#detailKat").val()}</h5>`;
                        showinformation(resultDisplayer, dataTotalPerPasar, 'thirdTable', 'forthTable');
                        loading.hidden = true;
                    }, 1800);
                    break;
            }

        });
    });
})();


