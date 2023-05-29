async function getUttp() {
    
    const url = "https://script.google.com/macros/s/AKfycbz_Je2ZXuIRFmxWdYpQTbgWbEa4iqU9ucJj1FrPK8hoql-UtKnFbBj-upEFOvWU7ZYH/exec";
    
    
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        let temporary = [];
        if (data.result === "success") {
            data.data.forEach(e => {
                temporary.push(e[0]);
            });

            temporary.shift();
            filtered = [...new Set(temporary)];
 
            let str = '';
            filtered.forEach(e => {
                str += `<option value='${e}'>${e}</option>`;
                
            });

            document.getElementById("uttpList").innerHTML = str;

        }
        
    });

}

async function getPasar() {
    
    const url = "https://script.google.com/macros/s/AKfycbwzVP84YKO62g10ShP-DKAqmOieh8VMJv_8L1FG6ZldOUNPnNFTTZgEKid6d8B6Dx6n/exec";
    
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        
        let temporary = [];
        if (data.result === "success") {
            console.log(data);
            data.data.forEach(e => {
                temporary.push(e[0]);
            });

            temporary.shift();
            filtered = [...new Set(temporary)];
 
            let str = '';
            filtered.forEach(e => {
                str += `<option value='${e}'>${e}</option>`;
                
            });

            document.getElementById("pasarList").innerHTML = str;

        }
        
    });

}

async function getWilayah() {
    
    const url = "https://script.google.com/macros/s/AKfycbxxWf-43TUg5XvBOes_r89pANhi6fCOQgqhF_SwEmjJMWSIvv9BSDEsX2ZCpUGQDMRg/exec";
    
    await fetch(url)
    .then(data => data.json())
    .then(data => {
        
        let temporary = [];
        if (data.result === "success") {
            console.log(data);
            data.data.forEach(e => {
                temporary.push(e[0]);
            });

            temporary.shift();
            filtered = [...new Set(temporary)];
 
            let str = '';
            filtered.forEach(e => {
                str += `<option value='Kelurahan ${e}'>Kelurahan ${e}</option>`;
                
            });

            document.getElementById("pasarList").innerHTML += str;

        }
        
    });

}

function checkInput(uttp, pasar, jumlah) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (uttp === "" || pasar === "" || jumlah === "") {
                resolve("true");
            } else {
                resolve("false");
            }
        }, 1000);
    })

}


function clearForm() {
    document.getElementById("editWtuForm").reset();
}

async function inputData(uttp = "", pasar = "", jml = "", container) {
    if (await checkInput(uttp, pasar, jml) === "true") {
        container.innerHTML = `Data gagal dimasukkan. Isian uttp, pasar/kelurahan, atau jumlah masih ada yang kosong`;
        return false;
    }

    const url = "https://script.google.com/macros/s/AKfycbzScXcAfbHkfIzEnBMyuFP6bqXc0UfYtKx7PWTH40tNat_NyaqlJdycWagSxpng6Z4B/exec";

    await fetch(url, {
        method : 'POST',
        body : JSON.stringify({'uttp' : uttp, 'pasar' : pasar, 'jml' : jml})
    })
    .then(data => data.json())
    .then(data => {
     
        if (data.result === "success") {
            container.innerHTML = data.msg;
        } else {
            container.innerHTML = `Data gagal dimasukkan -> ${data.msg}`;
        }

        clearForm();
    });
}

async function inputDataWly(uttp = "", wilayah = "", jml = "", container) {
    if (await checkInput(uttp, pasar, jml) === "true") {
        container.innerHTML = `Data gagal dimasukkan. Isian uttp, pasar/kelurahan, atau jumlah masih ada yang kosong`;
        return false;
    }

    const url = "https://script.google.com/macros/s/AKfycbyv8p_Exa1aWIrHSnHCIueqFTEvLDBWchA2HLjp7GrRibnPYbj2RwXN3gcTlQdNgpabOA/exec";

    let wly = wilayah.split(" ")[1];

    await fetch(url, {
        method : 'POST',
        body : JSON.stringify({'uttp' : uttp, 'wilayah' : wly, 'jml' : jml})
    })
    .then(data => data.json())
    .then(data => {
     
        if (data.result === "success") {
            container.innerHTML = data.msg;
        } else {
            container.innerHTML = `Data gagal dimasukkan -> ${data.msg}`;
        }

        clearForm();
    });
}

(async function main() {
    
    await getUttp();
    await getPasar();
    await getWilayah();

    const sbBtn = document.querySelector('.sbmt-btn');
    sbBtn.addEventListener("click", async () => {
        
        let uttp = document.getElementById('uttp').value;
        let pasar = document.getElementById('pasar').value;
        let jml = document.getElementById('jumlah').value;
        
        let konfirmKontainer = document.querySelector(".konfirm");
        document.querySelector(".ld0").hidden = false;
        pasar.includes("Kelurahan") ? await inputDataWly(uttp, pasar, jml, konfirmKontainer) : await inputData(uttp, pasar, jml, konfirmKontainer);

        document.querySelector(".ld0").hidden = true;
    });
})();