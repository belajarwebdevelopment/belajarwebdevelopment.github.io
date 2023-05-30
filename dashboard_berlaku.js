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
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'total', 'pasar' : ''})
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

async function getTotalStatUnidentified() {
    let a = {};
    //const apiUrl = "https://script.google.com/macros/s/AKfycbwlUaHq5TV3aomPLctIoH6snjIhT8l7wDv1h2GtA5_by4GrnzNwY5pirFTwnSX1vtsu/exec";
    //const apiUrl = "https://script.google.com/macros/s/AKfycbyb6rnqIyGdJaKwQJLE3_jJS9JHBBR4bloPzjaVeckDXI9NV0yV4-WOdKSzDcTPaRK4/exec";

    const apiUrl = "https://script.google.com/macros/s/AKfycbxOfCFj6qaD1AfYfG8KeBhXm2W-LVMkwim0eWcWYCBDs6CC10f6nKYAiphuVIOVwa3B/exec";
    
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'total', 'pasar' : ''})
    })
    .then(data => data.json())
    .then(data => {
        a = data;
    });

    return a;
}

async function getTotalStatUnidentifiedWly() {
    let a = {};
    const apiUrl = "https://script.google.com/macros/s/AKfycbwp76W1qYETlb3MKfHmckZlJUc_1QULHBi10WuJYbbcS4P8Q9nw6ytQHgj4Vp-8nxB0TQ/exec";
    
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'total', 'wilayah' : ''})
    })
    .then(data => data.json())
    .then(data => {
        a = data;
    });

    return a;
}

async function getTotalStatUnidentifiedPerWilayah(namaWilayah) {
    const apiUrl = "https://script.google.com/macros/s/AKfycbwp76W1qYETlb3MKfHmckZlJUc_1QULHBi10WuJYbbcS4P8Q9nw6ytQHgj4Vp-8nxB0TQ/exec";

    let b = {};
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'perWilayah', 'wilayah' : namaWilayah})
    })
    .then(data => data.json())
    .then(data => {
        b = data;
    });
    
    return b;
}

async function getTotalStatUnidentifiedPerPasar(namaPasar) {
    //const apiUrl = "https://script.google.com/macros/s/AKfycbyEFbfL6UkXFAle2SbJ0ydbf7zg1N-WKSF8zs8igQJXwaXhoVT7k8fbo19xRPU3W1qi/exec";
    //const apiUrl = "https://script.google.com/macros/s/AKfycbyb6rnqIyGdJaKwQJLE3_jJS9JHBBR4bloPzjaVeckDXI9NV0yV4-WOdKSzDcTPaRK4/exec";

    const apiUrl = "https://script.google.com/macros/s/AKfycbxOfCFj6qaD1AfYfG8KeBhXm2W-LVMkwim0eWcWYCBDs6CC10f6nKYAiphuVIOVwa3B/exec";

    let b = {};
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'perPasar', 'pasar' : namaPasar})
    })
    .then(data => data.json())
    .then(data => {
        b = data;
    });

    return b;
}

async function getTotalStatPerPasar(namaPasar, sortByPersen = false) {

    //const apiUrl = "https://script.google.com/macros/s/AKfycbzg7X13qGh1rjbAMCC0h7O1anZ0o6WQce8bASzxCPLHFy9Y95S81YG9XrrKQeTQxqQW/exec";
    const apiUrl = "https://script.google.com/macros/s/AKfycbxFtSd5upEblqWcvDVf0jLkMAfp5coj-xhjmtnL6VuF2puA7sAbalV53AW5gtXdaV4P/exec";
    
    
    let a = {};
    let sortedBlmTera = [];
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'perPasar', 'pasar' : namaPasar})
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
    //console.log([a,sortedBlmTera]);
    return [a,sortedBlmTera];

}

async function getTotalStatPerWilayah(namaWilayah, sortByPersen = false) {

    //const apiUrl = "https://script.google.com/macros/s/AKfycbwdd-DptsVsoqSUPhbMpZKFS1rY_E-Dh6ZmDwoQp01SjBekk7I92DUhMfHJ9WZhtAE/exec";
    //const apiUrl = "https://script.google.com/macros/s/AKfycbzEr9pJLiMW6-SyI-lcsWZ3q6VK3KgBB-3v-GdNz3SSqIuw2QSFu97QsStZLuhtDoLE/exec";
    const apiUrl = "https://script.google.com/macros/s/AKfycbx4L_SopgUGZll686pE491AQHfp0ICUyC13-wVHL57FkSEYs-GJ7y1Gn_lxUkwEvyBTfg/exec";
    
    let a = {};
    let sortedBlmTera = [];
    await fetch(apiUrl, {
        method : 'POST',
        body : JSON.stringify({'jenisData' : 'perWilayah', 'wilayah' : namaWilayah})
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

function sumArray(arr) {
    let sum = 0;
    for (let k of arr) {
        sum += k;
    }
    return sum;
}

function prosentase(a,b) {
    return ((a/b) * 100).toFixed(2);
}

async function showinformation(kontainer, srcData, kelasTbl1='firstTable', kelasTbl2='secondTable', srcData2) {
    if (srcData2 != undefined) {
        //console.log(srcData);
        //console.log(srcData2.uttpUndetected);
        //console.log(sumArray(Object.values(srcData2.uttpUndetected)));
        let undetected =  sumArray(Object.values(srcData2.uttpUndetected));
        kontainer.innerHTML += `<table class=${kelasTbl1}>
            <tr><td>Total Uttp</td><td>${srcData[0].totalStat.totalUttp} unit</td></tr>
            <tr><td>Total Uttp Sdh Tera</td><td>${srcData[0].totalStat.totalUttpSdhTera + undetected} unit</td></tr>
            <tr><td>Persen Uttp Sdh Tera</td><td>${prosentase(srcData[0].totalStat.totalUttpSdhTera + undetected, srcData[0].totalStat.totalUttp)} %</td></tr>
        </table>`;            
    } else {
        kontainer.innerHTML += `<table class=${kelasTbl1}>
            <tr><td>Total Uttp</td><td>${srcData[0].totalStat.totalUttp} unit</td></tr>
            <tr><td>Total Uttp Sdh Tera</td><td>${srcData[0].totalStat.totalUttpSdhTera} unit</td></tr>
            <tr><td>Persen Uttp Sdh Tera</td><td>${srcData[0].totalStat.persenSdhTera} %</td></tr>
        </table>`;
    
    }

    let str = `<table class=${kelasTbl2}><tr><th colspan=3 align='center'>Jml Uttp Yang Belum Tera<th></tr><tr><th></th><th style='text-align : right;'><!--<a class='gb' href=#><img src='asc.png'></a>--></th><th></th></tr>`;
    if (srcData2 != undefined) {
        console.log(srcData);
        console.log(srcData2.uttpUndetected);
        for (k of srcData[1]) {
            srcData2.uttpUndetected[k] === undefined ? srcData2.uttpUndetected[k] = 0 : '';
            let total = srcData[0].uttpBlmTeraObj[k] - srcData2.uttpUndetected[k];
            let persen = prosentase(total, srcData[0].uttpAllObj[k]); 
            
            str += `<tr><td>${k}</td><td style='text-align : right;'>${persen} %</td><td style='text-align : right;'>${total}/${srcData[0].uttpAllObj[k]} unit</td></tr>`;
        }
    } else {
        for (k of srcData[1]) {
            let persen = (srcData[0].uttpBlmTeraObj[k]/srcData[0].uttpAllObj[k])*100
            str += `<tr><td>${k}</td><td style='text-align : right;'>${persen.toFixed(2)} %</td><td style='text-align : right;'>${srcData[0].uttpBlmTeraObj[k]}/${srcData[0].uttpAllObj[k]} unit</td></tr>`;
        }       
    }
    str += `</table>`;
    kontainer.innerHTML += str;             
}

(async function main() {
    let year = new Date().getFullYear();
    document.getElementById("teraBerlaku").append(` [${year - 1} & ${year}]`);
    document.getElementById("teraSah").append(` ${year}`);
    document.querySelector("h4").append(` ${year - 1} & ${year}`);

    let loadingTotPsr = document.querySelector('.ld1');
    loadingTotPsr.hidden = false;
    
    let dataTotalUn = await getTotalStatUnidentified();

    let dataTotal = await getTotalStat("https://script.google.com/macros/s/AKfycbxFtSd5upEblqWcvDVf0jLkMAfp5coj-xhjmtnL6VuF2puA7sAbalV53AW5gtXdaV4P/exec");

    loadingTotPsr.hidden = true;
    let pasarDiv = document.getElementsByClassName('sumChild')[0];
    dataTotalUn.result === "error" ? showinformation(pasarDiv, dataTotal, 'firstTable', 'secondTable') : showinformation(pasarDiv, dataTotal, 'firstTable', 'secondTable', dataTotalUn);
    //showinformation(pasarDiv, dataTotal, 'firstTable', 'secondTable');

    //Menampilkan data total wilayah
    let loadingTotWly = document.querySelector('.ld2');
    loadingTotWly.hidden = false;
    
    let dataTotalUnWly = await getTotalStatUnidentifiedWly();

    let dataTotalWilayah = await getTotalStat("https://script.google.com/macros/s/AKfycbx4L_SopgUGZll686pE491AQHfp0ICUyC13-wVHL57FkSEYs-GJ7y1Gn_lxUkwEvyBTfg/exec");

    loadingTotWly.hidden = true;
    let wilayahDiv = document.getElementsByClassName('sumChild')[1];
    dataTotalUnWly.result === "error" ? showinformation(wilayahDiv, dataTotalWilayah, 'firstTable', 'secondTable') : showinformation(wilayahDiv, dataTotalWilayah, 'firstTable', 'secondTable', dataTotalUnWly);
    //showinformation(wilayahDiv, dataTotalWilayah, 'firstTable', 'secondTable');


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
                    setTimeout(async () => {
                        let wly = $("#detailKat").val().split(" - ")[0];
                        let dataTotalUnidentified = await getTotalStatUnidentifiedPerWilayah(wly);
                        let dataTotalPerWilayah = await getTotalStatPerWilayah(wly);
                        resultDisplayer.innerHTML = '';
                        resultDisplayer.innerHTML += `<h5>${$("#detailKat").val()}</h5>`;
                        dataTotalUnidentified.result === "error" ? showinformation(resultDisplayer, dataTotalPerWilayah, 'thirdTable', 'forthTable') : showinformation(resultDisplayer, dataTotalPerWilayah, 'thirdTable', 'forthTable', dataTotalUnidentified);
                        loading.hidden = true;
                    }, 1800);
                    break;
                case 'pasar':
                    setTimeout(async () => {
                        let dataTotalUnidentified = await getTotalStatUnidentifiedPerPasar($("#detailKat").val());
                        
                        let dataTotalPerPasar = await getTotalStatPerPasar($("#detailKat").val());
                        resultDisplayer.innerHTML = '';
                        resultDisplayer.innerHTML += `<h5>${$("#detailKat").val()}</h5>`;
                        dataTotalUnidentified.result === "error" ? showinformation(resultDisplayer, dataTotalPerPasar, 'thirdTable', 'forthTable') : showinformation(resultDisplayer, dataTotalPerPasar, 'thirdTable', 'forthTable', dataTotalUnidentified);
                        loading.hidden = true;
                    }, 1800);
                    break;
            }

        });
    });

    let menuUtamaLnk = document.querySelector('.mnUtama');
    menuUtamaLnk.addEventListener('click', () => window.location = "index.html");

    let menuTeraSah = document.getElementById("teraSah");
    menuTeraSah.addEventListener("click", () => window.location = "dashboard.html");

    let menuTeraBerlaku = document.getElementById("teraBerlaku");
    menuTeraBerlaku.addEventListener("click", () => window.location = "dashboard_berlaku.html")

})();


