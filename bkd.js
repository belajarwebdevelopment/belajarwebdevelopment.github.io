
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

const execHitung = function(kapMax,IntVerifikasi) {
    const uKelas = tabelBKD(kapMax,IntVerifikasi).getClass()['Kelas'];
    const uKelasFiltered = Object.keys(uKelas)
        .filter(key => uKelas[key][0] == true)
        .reduce((preVal,curVal) => (preVal[curVal] = uKelas[curVal], preVal),{});
    
    const tag = Object.keys(uKelasFiltered).forEach((a,index) => {
        document.getElementById("alert2Kelas").hidden = true;
        if (index == 1) {
            document.getElementById("alert2Kelas").hidden = false;
        }
        let arr = Object.values(uKelasFiltered[a][2]);
        let konten = `${arr.map(idx => `<tr><td>
            ${idx['mn']} - ${idx['mx']} g
        </td><td>
            ${idx['bkdTera']} g
        </td><td>
            ${idx['bkdTera']*2} g
        </td><td>${uKelasFiltered[a][1]} g</td></tr>`).join('')}`;
    
        document.querySelector(`#dataJudul${index+1}`).hidden = false;
        document.querySelector(`#dataJudul${index+1}`).innerHTML = `Kelas ${a.split('_')[0]}`;
        document.querySelector(`#dataTabel${index+1}`).hidden = false;
        document.querySelector(`#konten${index+1}`).innerHTML = konten;
    });    
} 

const clearForm = function() {
    document.getElementById('form1').reset();
}

let tombol = document.getElementById('hitung');
tombol.addEventListener("click",() => {
    let kapMax = parseInt(document.getElementById('max').value);
    let IntVerifikasi = parseInt(document.getElementById('e').value);
    execHitung(kapMax,IntVerifikasi);
    clearForm();
});

// const uKelas = tabelBKD(300000,100).getClass()['Kelas'];
// const uKelasFiltered = Object.keys(uKelas)
//     .filter(key => uKelas[key][0] == true)
//     .reduce((preVal,curVal) => (preVal[curVal] = uKelas[curVal], preVal),{});

// const tag = Object.keys(uKelasFiltered).forEach((a,index) => {
//     //console.log(index);
//     if (index == 1) {
//         document.getElementById("alert2Kelas").toggleAttribute('hidden');
//     }
//     let arr = Object.values(uKelasFiltered[a][2]);
//     let konten = `${arr.map(idx => `<tr><td>
//         ${idx['mn']} - ${idx['mx']} g
//     </td><td>
//         ${idx['bkdTera']} g
//     </td><td>
//         ${idx['bkdTera']*2} g
//     </td><td>${uKelasFiltered[a][1]} g</td></tr>`).join('')}`;

//     document.querySelector(`#dataJudul${index+1}`).hidden = false;
//     document.querySelector(`#dataJudul${index+1}`).innerHTML = `Kelas ${a.split('_')[0]}`;
//     document.querySelector(`#dataTabel${index+1}`).hidden = false;
//     document.querySelector(`#konten${index+1}`).innerHTML = konten;
// });


