document.addEventListener('DOMContentLoaded', function () {
    // --- Mock Data ---
    const dispoData = {
        categories: ['Disponível', 'Disponível sem Reserva', 'Disponível com Reserva', 'Empenhado a Liquidar'],
        values: [32.03, 25.10, 6.93, 15.45]
    };

    const expenseGroups = [
        '1 - PESSOAL E ENC. SOCIAIS', '2 - JUROS E ENC. DÍVIDA', '3 - OUTRAS DESP. CORRENTES',
        '4 - INVESTIMENTOS', '5 - INVERSÕES FINANC.', '6 - AMORTIZAÇÃO DÍVIDA', '9 - RESERVA CONTINGÊNCIA'
    ];

    const poList = [
        { po: '000001 - N. DEF.', orc: 450000000, aut: 420000000, emp: 380000000, liq: 250000000, liqAnt: 220000000 },
        { po: '003339 - SEP', orc: 8200000000, aut: 9100000000, emp: 8500000000, liq: 5200000000, liqAnt: 4800000000 },
        { po: '002778 - TI', orc: 6100000000, aut: 6100000000, emp: 5800000000, liq: 3100000000, liqAnt: 2900000000 },
        { po: '001676 - ADM. UNID', orc: 3500000000, aut: 4200000000, emp: 3100000000, liq: 1200000000, liqAnt: 1500000000 },
        { po: '000002 - D. OBRIG.', orc: 28000000000, aut: 28000000000, emp: 25000000000, liq: 18000000000, liqAnt: 17000000000 },
        { po: '003213 - SEGER', orc: 1200000000, aut: 1200000000, emp: 1100000000, liq: 900000000, liqAnt: 850000000 }
    ];

    const sucessTableData = [
        { ano: 2026, grupo: expenseGroups[0], aut: '14,20 B', emp: '13,50 B', liq: '8,20 B', p_emp: '95,1%', p_liq: '57,7%' },
        { ano: 2026, grupo: expenseGroups[1], aut: '2,10 B', emp: '1,85 B', liq: '1,73 B', p_emp: '88,0%', p_liq: '82,4%' },
        { ano: 2026, grupo: expenseGroups[2], aut: '8,40 B', emp: '7,76 B', liq: '5,88 B', p_emp: '92,4%', p_liq: '70,1%' },
        { ano: 2026, grupo: expenseGroups[3], aut: '10,10 B', emp: '8,40 B', liq: '3,20 B', p_emp: '83,2%', p_liq: '31,7%' },
        { ano: 2026, grupo: expenseGroups[4], aut: '0,50 B', emp: '0,38 B', liq: '0,23 B', p_emp: '76,0%', p_liq: '45,2%' },
        { ano: 2026, grupo: expenseGroups[5], aut: '2,20 B', emp: '2,20 B', liq: '2,15 B', p_emp: '100,0%', p_liq: '98,0%' },
        { ano: 2025, grupo: expenseGroups[0], aut: '12,50 B', emp: '12,10 B', liq: '11,80 B', p_emp: '96,8%', p_liq: '94,4%' },
        { ano: 2025, grupo: expenseGroups[1], aut: '2,00 B', emp: '1,80 B', liq: '1,70 B', p_emp: '90,0%', p_liq: '85,0%' },
        { ano: 2025, grupo: expenseGroups[2], aut: '7,50 B', emp: '7,10 B', liq: '6,40 B', p_emp: '94,7%', p_liq: '85,3%' },
        { ano: 2025, grupo: expenseGroups[3], aut: '8,40 B', emp: '7,20 B', liq: '5,10 B', p_emp: '85,7%', p_liq: '60,7%' }
    ];

    const fmtB = (v) => "R$ " + (v/1000000000).toFixed(2) + " B";
    const popTab = (id, html) => { const el = document.getElementById(id); if(el) el.innerHTML = html; };

    // --- Charts (Only 2026) ---

    // 1. Disponibilidades
    new ApexCharts(document.querySelector("#chart-dispo"), {
        series: [{ name: 'Valor', data: dispoData.values }],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c', '#56a380', '#a372c4'],
        plotOptions: { bar: { borderRadius: 0, horizontal: false, distributed: true, dataLabels: { position: 'top' } } },
        dataLabels: { enabled: true, formatter: (val) => "R$ " + val + " B", offsetY: -25, style: { fontSize: '11px', colors: ["#666"] } },
        xaxis: { categories: dispoData.categories, labels: { style: { fontSize: '9px', fontWeight: 600 } } },
        yaxis: { show: false }, grid: { show: false },
        tooltip: {
            custom: function({ series, dataPointIndex, w }) {
                const labels = w.globals.labels;
                const vals = series[0];
                let rowsHtml = '';
                labels.forEach((label, i) => {
                    const color = w.config.colors[i];
                    rowsHtml += `<div class="tooltip-row ${i===dataPointIndex?'active':''}"><span class="dot" style="background:${color}"></span><span class="label">${label}</span><span class="val">R$ ${vals[i].toFixed(2)} B</span></div>`;
                });
                return `<div class="premium-tooltip"><div class="tooltip-header"><div class="uo-info">UO: 2601 - SEDUC</div><div class="exercise-info">Exercício: 2026</div></div><div class="tooltip-body">${rowsHtml}</div></div>`;
            }
        }
    }).render();

    // 2. Sucesso Planejamento
    new ApexCharts(document.querySelector("#chart-sucesso"), {
        series: [
            { name: 'Empenhado/Autorizado', data: [95.1, 88.0, 92.4, 83.2, 76.0, 100.0] }, 
            { name: 'Liquidado/Autorizado', data: [57.7, 82.4, 70.1, 31.7, 45.2, 98.0] }
        ],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c'],
        plotOptions: { bar: { borderRadius: 0, columnWidth: '60%' } },
        dataLabels: { enabled: true, formatter: (val) => val + "%", style: { fontSize: '9px' } },
        xaxis: { categories: expenseGroups.slice(0, 6), labels: { rotate: -45, style: { fontSize: '8px', fontWeight: 600 } } },
        yaxis: { max: 100, labels: { formatter: (val) => val + "%" } },
        legend: { position: 'bottom' }
    }).render();

    // 3. Comparativo Despesa
    new ApexCharts(document.querySelector("#chart-comparativo"), {
        series: [{ name: '2026', data: [8.20, 2.10, 6.80, 3.20, 0.50, 2.20, 0.00] }],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8'],
        plotOptions: { bar: { borderRadius: 0, columnWidth: '50%', dataLabels: { position: 'top' } } },
        dataLabels: { enabled: true, formatter: (val) => "R$ " + val + " B", offsetY: -20, style: { fontSize: '9px', colors: ["#444"] } },
        xaxis: { categories: expenseGroups, labels: { rotate: -45, style: { fontSize: '8px', fontWeight: 700 } } },
        yaxis: { show: false }, grid: { show: false }
    }).render();

    // 4. Plano Orçamentário
    new ApexCharts(document.querySelector("#chart-po"), {
        series: [{ name: '2026', data: poList.map(p => Number((p.liq/1000000000).toFixed(2))) }],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c', '#56a380', '#a372c4', '#f1c40f', '#e67e22'],
        plotOptions: { bar: { horizontal: true, barHeight: '70%', borderRadius: 0, distributed: true, dataLabels: { position: 'center' } } },
        dataLabels: { enabled: true, style: { fontSize: '8px', colors: ['#fff'] } },
        xaxis: { categories: poList.map(p => p.po), labels: { formatter: (val) => "R$ " + val + " B", style: { fontSize: '8px' } } },
        yaxis: { labels: { style: { fontSize: '9px', fontWeight: 700 } } }
    }).render();

    // --- Tables (2025 vs 2026, Totals First) ---

    // A. Plano Orçamentário Table
    let tablePoHtml = '';
    let poT25 = 0, poT26 = 0;
    poList.forEach(p => { p.aut25 = p.aut * 0.92; poT25 += p.aut25; poT26 += p.aut; });
    const poVarCons = (((poT26 - poT25) / poT25) * 100).toFixed(1);
    tablePoHtml += `<tr class="row-total" style="background:#f1f5f9;"><td>TOTAL CONSOLIDADO</td><td>${fmtB(poT25)}</td><td>${fmtB(poT26)}</td><td class="${Number(poVarCons)>0?'variation-up':'variation-down'}">${poVarCons}%</td></tr>`;
    poList.forEach(row => {
        const varPct = (((row.aut - row.aut25) / row.aut25) * 100).toFixed(1);
        const vC = Number(varPct) > 0 ? 'variation-up' : (Number(varPct) < 0 ? 'variation-down' : '');
        tablePoHtml += `<tr><td>${row.po}</td><td>${fmtB(row.aut25)}</td><td>${fmtB(row.aut)}</td><td class="${vC}" style="font-weight:bold;">${varPct}%</td></tr>`;
    });
    popTab('table-po-detalhado', tablePoHtml);

    // B. Sucesso Planejamento Table
    let tableSucessoHtml = '', sA25=0, sE25=0, sL25=0, sA26=0, sE26=0, sL26=0;
    const val = (s) => parseFloat(s.replace(' B', '').replace(',', '.'));
    sucessTableData.forEach(row => {
        if(row.ano === 2025) { sA25+=val(row.aut); sE25+=val(row.emp); sL25+=val(row.liq); }
        else { sA26+=val(row.aut); sE26+=val(row.emp); sL26+=val(row.liq); }
    });
    if (sA26 > 0) tableSucessoHtml += `<tr class="row-total" style="background:#f1f5f9;"><td>TOTAL EXERCÍCIO 2026</td><td>${sA26.toFixed(2).replace('.',',')} B</td><td>${sE26.toFixed(2).replace('.',',')} B</td><td>${sL26.toFixed(2).replace('.',',')} B</td><td>${((sE26/sA26)*100).toFixed(1)}%</td><td>${((sL26/sA26)*100).toFixed(1)}%</td></tr>`;
    if (sA25 > 0) tableSucessoHtml += `<tr class="row-total" style="background:#f1f5f9;"><td>TOTAL EXERCÍCIO 2025</td><td>${sA25.toFixed(2).replace('.',',')} B</td><td>${sE25.toFixed(2).replace('.',',')} B</td><td>${sL25.toFixed(2).replace('.',',')} B</td><td>${((sE25/sA25)*100).toFixed(1)}%</td><td>${((sL25/sA25)*100).toFixed(1)}%</td></tr>`;
    
    let currYear = null;
    sucessTableData.sort((a,b) => b.ano - a.ano).forEach(row => {
        if (row.ano !== currYear) { currYear = row.ano; tableSucessoHtml += `<tr class="bg-light fw-bold"><td colspan="6" class="text-start" style="background:#f8fafc; color:#1e3a8a; padding-left:20px;">DETALHAMENTO ${currYear}</td></tr>`; }
        tableSucessoHtml += `<tr><td>${row.grupo}</td><td>${row.aut}</td><td>${row.emp}</td><td>${row.liq}</td><td style="color:#56c0d8; font-weight:bold;">${row.p_emp}</td><td style="color:#ef8b9c; font-weight:bold;">${row.p_liq}</td></tr>`;
    });
    popTab('table-sucesso-detalhado', tableSucessoHtml);

    // C. Comparativo Despesa Table
    let compHtml = '', tV25=0, tV26=0;
    const compData = [ { g: expenseGroups[0], v25: 12.50, v26: 14.20 }, { g: expenseGroups[1], v25: 2.10, v26: 2.10 }, { g: expenseGroups[2], v25: 7.80, v26: 8.40 }, { g: expenseGroups[3], v25: 8.40, v26: 10.10 }, { g: expenseGroups[4], v25: 0.45, v26: 0.50 }, { g: expenseGroups[5], v25: 2.05, v26: 2.20 } ];
    compData.forEach(d => { tV25 += d.v25; tV26 += d.v26; });
    const tVar = (((tV26 - tV25) / tV25) * 100).toFixed(1);
    compHtml += `<tr class="row-total" style="background:#f1f5f9;"><td>TOTAL CONSOLIDADO</td><td>R$ ${tV25.toFixed(2)} B</td><td>R$ ${tV26.toFixed(2)} B</td><td style="font-weight:bold;">${tVar}%</td></tr>`;
    compData.sort((a,b) => b.v26 - a.v26).forEach(d => {
        const varPct = (((d.v26 - d.v25) / d.v25) * 100).toFixed(1);
        const varClass = Number(varPct) > 0 ? 'variation-up' : (Number(varPct) < 0 ? 'variation-down' : '');
        compHtml += `<tr><td>${d.g}</td><td>R$ ${d.v25.toFixed(2)} B</td><td>R$ ${d.v26.toFixed(2)} B</td><td class="${varClass}" style="font-weight:bold;">${varPct}%</td></tr>`;
    });
    popTab('table-despesa-comparativo', compHtml);

    // D. Disponibilidade Table
    popTab('table-dispo', dispoData.categories.map((cat, i) => `<tr><td style="text-align:left;">${cat}</td><td class="text-end fw-bold">R$ ${dispoData.values[i]} B</td></tr>`).join(''));

    // --- Handlers ---
    document.querySelectorAll('.flip-trigger').forEach(btn => { btn.onclick = function() { const card = this.closest('.card-chart-standard').querySelector('.flip-card'); if(card) card.classList.toggle('flipped'); }; });
    document.querySelectorAll('.expand-trigger').forEach(btn => { btn.onclick = function() { const card = this.closest('.card-chart-standard'); card.classList.toggle('fullscreen-card'); this.classList.toggle('fa-expand'); this.classList.toggle('fa-compress'); if(card.classList.contains('fullscreen-card')) document.body.style.overflow = 'hidden'; else document.body.style.overflow = 'auto'; setTimeout(() => window.dispatchEvent(new Event('resize')), 300); }; });

    // Filter Chips
    const tagsContainer = document.getElementById('filter-tags-container');
    const selects = { ano: document.getElementById('filter-ano'), mes: document.getElementById('filter-mes'), uo: document.getElementById('filter-uo') };
    function updateChips() {
        if (!tagsContainer) return; tagsContainer.innerHTML = '';
        Object.keys(selects).forEach(key => {
            const select = selects[key]; if (!select) return;
            const values = Array.from(select.selectedOptions).map(opt => opt.value);
            if (values.length > 0 && values[0] !== 'Selecionar...') {
                const chip = document.createElement('div'); chip.className = 'filter-tag';
                chip.innerHTML = `<div class="d-flex flex-column"><div class="tag-label">${key.toUpperCase()}:</div><div class="tag-value">${values.join('; ')}</div></div>`;
                if (key !== 'ano') chip.innerHTML += `<button class="remove-tag" data-key="${key}">X</button>`;
                tagsContainer.appendChild(chip);
            }
        });
        document.querySelectorAll('.remove-tag').forEach(btn => { btn.onclick = function() { const key = this.getAttribute('data-key'); const select = selects[key]; if(select.multiple) Array.from(select.options).forEach(opt => opt.selected = false); else select.selectedIndex = 0; updateChips(); }; });
    }
    document.getElementById('btn-filtrar')?.addEventListener('click', updateChips);
    document.getElementById('btn-restaurar')?.addEventListener('click', function() { Object.keys(selects).forEach(key => { const select = selects[key]; if(key === 'ano') select.value = '2026'; else if(select.multiple) Array.from(select.options).forEach(opt => opt.selected = false); else select.selectedIndex = 0; }); updateChips(); });
    updateChips();
});
