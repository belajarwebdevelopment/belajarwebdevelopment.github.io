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

(function main() {
    getUttp();
    getPasar();
})();