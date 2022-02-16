

function tabelBKD(max,e) {
    const is_eInRange = (min, max, val) => {
        if (val <= max && val >= min) {
            return true;
        } else {
            return false;
        }
    }

    const is_nInRange = (min, max, val) => {
        if (val <= max && val >= min) {
            return true;
        } else {
            return false;
        }
    } 

    return {
        //max : max,
        //e : e,
        getClass : () => {
            let n = max/e;
            const Kelas = {
                I : [is_eInRange(0.001,Infinity,e) && is_nInRange(50000,Infinity,n), 100*e, {
                    range1 : {mn : 0*e, mx : 50000*e, bkdTera : 0.5*e}, 
                    range2 : {mn : 50000*e, mx : 200000*e, bkdTera : 1*e}, 
                    range3 : {mn : 200000*e, mx : Infinity*e, bkdTera : 1.5*e}
                }],
                II : [is_eInRange(0.001,0.05,e) && is_nInRange(100,100000,n), 20*e, {
                    range1 : {mn : 0*e, mx : 5000*e, bkdTera : 0.5*e}, 
                    range2 : {mn : 5000*e, mx : 20000*e, bkdTera : 1*e}, 
                    range3 : {mn : 20000*e, mx : 100000*e, bkdTera : 1.5*e}
                }],
                II_ : [is_eInRange(0.1,Infinity,e) && is_nInRange(5000,100000,n), 50*e, {
                    range1 : {mn : 0*e, mx : 5000*e, bkdTera : 0.5*e}, 
                    range2 : {mn : 5000*e, mx : 20000*e, bkdTera : 1*e}, 
                    range3 : {mn : 20000*e, mx : 100000*e, bkdTera : 1.5*e}
                }],
                III : [is_eInRange(0.1,2,e) && is_nInRange(100,10000,n), 20*e, {
                    range1 : {mn : 0*e, mx : 500*e, bkdTera : 0.5*e}, 
                    range2 : {mn : 500*e, mx : 2000*e, bkdTera : 1*e}, 
                    range3 : {mn : 2000*e, mx : 10000*e, bkdTera : 1.5*e}
                }],
                III_ : [is_eInRange(5,Infinity,e) && is_nInRange(500,10000,n), 20*e, {
                    range1 : {mn : 0*e, mx : 500*e, bkdTera : 0.5*e}, 
                    range2 : {mn : 500*e, mx : 2000*e, bkdTera : 1*e}, 
                    range3 : {mn : 2000*e, mx : 10000*e, bkdTera : 1.5*e}
                }],
                IIII : [is_eInRange(5,Infinity,e) && is_nInRange(100,1000,n), 10*e, {
                    range1 : {mn : 0*e, mx : 50*e, bkdTera : 0.5*e}, 
                    range2 : {mn : 50*e, mx : 200*e, bkdTera : 1*e}, 
                    range3 : {mn : 200*e, mx : 1000*e, bkdTera : 1.5*e}
                }],
            }

            return {max, e, n, Kelas};            
        },
    };

}

const setHidden = () => {
    document.getElementById("alert2Kelas").hidden = true;
    document.querySelector(`#dataTabel1`).hidden = true;
    document.querySelector(`#dataTabel2`).hidden = true;
    document.querySelector(`#dataJudul1`).hidden = true;
    document.querySelector(`#dataJudul2`).hidden = true;
}

const clearForm = function() {
    document.getElementById('form1').reset();
}

const setEnabled = () => {
    document.getElementById("muatan").removeAttribute("disabled");
    document.getElementById("muatan").value = "";
    document.getElementById("changeSat").removeAttribute("disabled");
    document.getElementById("changeSat").checked = false;
}

const setDisabled = () => {
    document.getElementById("muatan").setAttribute("disabled", true);
    document.getElementById("muatan").value = "";
    document.getElementById("changeSat").setAttribute("disabled", true);
    document.getElementById("changeSat").checked = false;
}

const execHitung = function(kapMax,IntVerifikasi) {
    let uKelas = tabelBKD(kapMax,IntVerifikasi).getClass()['Kelas'];
    let uKelasFiltered = Object.keys(uKelas)
        .filter(key => uKelas[key][0] == true)
        .reduce((preVal,curVal) => (preVal[curVal] = uKelas[curVal], preVal),{});
    
    let tag = Object.keys(uKelasFiltered).forEach((a,index) => {
        if (index == 1) {
            document.getElementById("alert2Kelas").hidden = false;
        }
        let arr = Object.values(uKelasFiltered[a][2]);
        let konten = `${arr.map((idx, indeks) => `<tr id="konten${index+1}${indeks}"><td>
            ${idx['mn']} - ${idx['mx']} g
        </td><td>
            ${Math.round(idx['bkdTera']*100000)/100000} g
        </td><td>
            ${Math.round(idx['bkdTera']*2*100000)/100000} g
        </td><td>${uKelasFiltered[a][1]} g</td></tr>`).join('')}`;
        document.querySelector(`#dataJudul${index+1}`).hidden = false;
        document.querySelector(`#dataJudul${index+1}`).innerHTML = "";       
        document.querySelector(`#dataJudul${index+1}`).innerHTML = `Kelas ${a.split('_')[0]}`;
        document.querySelector(`#dataTabel${index+1}`).hidden = false;
        document.querySelector(`#konten${index+1}`).innerHTML = "";
        document.querySelector(`#konten${index+1}`).innerHTML = konten;
    });    
} 

const konversiSatuan = (tabelName, satuan) => {
    let kontenTabel = document.getElementById(tabelName),rIndex,cIndex;
    for (i=0;i<kontenTabel.rows.length;i++) {
        for (j=0;j<kontenTabel.rows[i].cells.length;j++) {
            if (j == 0) {
                if (satuan == "kg") {
                    kontenTabel.rows[i].cells[j].innerHTML = kontenTabel.rows[i].cells[j].innerText.replace('g', '').split(" - ").map(elem => parseFloat(elem.trim())/1000).reduce((string, curr) => `${string}${curr} - `,'').slice(0,-2)+' kg';
                } else {
                    kontenTabel.rows[i].cells[j].innerHTML = kontenTabel.rows[i].cells[j].innerText.replace('kg', '').split(" - ").map(elem => parseFloat(elem.trim())*1000).reduce((string, curr) => `${string}${curr} - `,'').slice(0,-2)+' g';
                }
            } 
        }
    }
}

let pilihRange = (tabelName, load, isSatuanKg, styleName) => {
    let kontenTabel = document.getElementById(tabelName);
    if (isSatuanKg) {
        load = load/1000;
    }

    resetKontenStyle(styleName);

    for (i=0;i<kontenTabel.rows.length;i++) {
        let rentang = kontenTabel.rows[i].cells[0].innerText.replace('g', '').split(" - ").map(elem => parseFloat(elem.trim()));
        if (load > rentang[0] && load <= rentang[1]) {
            document.getElementById(tabelName+i).classList.add(styleName);
            return false;    
        }
    }
}

const resetKontenStyle = (nama_kelas) => {
    elements=document.getElementsByClassName(nama_kelas);

    for (element of elements) {
        element.classList.remove(nama_kelas);
    }
}

/* ###################################################### MAIN PROGRAM ########################################################## */
let tombol = document.getElementById('hitung');
tombol.addEventListener("click",() => {
    setHidden();
    let kapMax = parseFloat(document.getElementById('max').value);
    let IntVerifikasi = parseFloat(document.getElementById('e').value);
    execHitung(kapMax,IntVerifikasi);
    setEnabled(); 
});

let tombolReset = document.getElementById('reset');
tombolReset.addEventListener('click', () => {
    clearForm();
    setDisabled();
});

let m_inputClass = document.getElementsByClassName("m_input");
for (i=0;i<m_inputClass.length;i++) {
    m_inputClass[i].onkeyup = () => {
        setDisabled();
        setHidden();
    }
}

let clickBoxKlik = document.getElementById("changeSat");
clickBoxKlik.addEventListener("click", () => {
    if (clickBoxKlik.checked) {
        konversiSatuan("konten1", "kg");
        konversiSatuan("konten2", "kg");
    } else {
        konversiSatuan("konten1", "g");
        konversiSatuan("konten2", "g");
    }    
});

let loadInput = document.getElementById('muatan');
loadInput.addEventListener("keyup", () => {
    pilihRange("konten1", parseFloat(loadInput.value), clickBoxKlik.checked, "highlight1");
    pilihRange("konten2", parseFloat(loadInput.value), clickBoxKlik.checked, "highlight2");
});

let maxInputChange = document.getElementById("max");
maxInputChange.addEventListener("keyup", () => {
    document.getEelementById("d").setAttribute('value','');
    document.getEelementById("e").setAttribute('value','');    
});
