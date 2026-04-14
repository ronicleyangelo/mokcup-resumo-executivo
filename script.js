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

    const poDataDetailed = [
        { po: '000001 - N. DEF.', o25: 450000000, a25: 420000000, e25: 380000000, l25: 250000000, l24: 220000000, o26: 480000000, a26: 450000000, e26: 350000000, l26: 300000000 },
        { po: '003339 - SEP', o25: 8200000000, a25: 9100000000, e25: 8500000000, l25: 5200000000, l24: 4800000000, o26: 8500000000, a26: 9200000000, e26: 8800000000, l26: 5500000000 },
        { po: '002778 - TI', o25: 6100000000, a25: 6100000000, e25: 5800000000, l25: 3100000000, l24: 2900000000, o26: 6200000000, a26: 6150000000, e26: 5900000000, l26: 3400000000 },
        { po: '001676 - ADM. UNID', o25: 3500000000, a25: 4200000000, e25: 3100000000, l25: 1200000000, l24: 1500000000, o26: 3800000000, a26: 4400000000, e26: 3500000000, l26: 1800000000 },
        { po: '000002 - D. OBRIG.', o25: 28000000000, a25: 28000000000, e25: 25000000000, l25: 18000000000, l24: 17000000000, o26: 30000000000, a26: 30000000000, e26: 28000000000, l26: 22000000000 },
        { po: '003213 - SEGER', o25: 1200000000, a25: 1200000000, e25: 1100000000, l25: 900000000, l24: 850000000, o26: 1300000000, a26: 1250000000, e26: 1150000000, l26: 1050000000 }
    ];
    const poList = poDataDetailed; // For compatibility with chart code if it uses poList

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

    const fmtB = (v) => "R$ " + (v / 1000000000).toFixed(2) + " B";
    const fmtFull = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    const fV = (v) => v.toFixed(2) + " B";
    const popTab = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

    // --- Charts (Only 2026) ---

    // 1. Disponibilidades
    new ApexCharts(document.querySelector("#chart-dispo"), {
        series: [{ name: 'Valor', data: dispoData.values }],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c', '#56a380', '#a372c4'],
        plotOptions: { bar: { borderRadius: 0, horizontal: false, distributed: true, dataLabels: { position: 'top' } } },
        dataLabels: { enabled: true, formatter: (val) => "R$ " + val + " B", offsetY: -25, style: { fontSize: '11px', colors: ["#666"] } },
        xaxis: { categories: dispoData.categories, labels: { style: { fontSize: '9px', fontWeight: 600 } } },
        yaxis: { show: true, labels: { formatter: (val) => "R$ " + val + " B" } },
        grid: { show: true, borderColor: '#f1f1f1' },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }) {
                const labels = w.globals.labels;
                const vals = series[0];
                let rowsHtml = '';
                labels.forEach((label, i) => {
                    const color = w.config.colors[i];
                    const fullVal = vals[i] * 1000000000;
                    rowsHtml += `<div class="tooltip-row ${i === dataPointIndex ? 'active' : ''}"><span class="dot" style="background:${color}"></span><span class="label">${label}</span><span class="val">${fmtFull(fullVal)}</span></div>`;
                });
                return `<div class="premium-tooltip"><div class="tooltip-header"><div class="uo-info">UO: 2601 - SEDUC</div><div class="exercise-info">Exercício: 2026</div></div><div class="tooltip-body">${rowsHtml}</div></div>`;
            }
        }
    }).render();

    // 2. Sucesso Planejamento
    new ApexCharts(document.querySelector("#chart-sucesso"), {
        series: [
            { name: 'Empenhado (2026)', data: [95.1, 88.0, 92.4, 83.2, 76.0, 100.0] },
            { name: 'Liquidado (2026)', data: [57.7, 82.4, 70.1, 31.7, 45.2, 98.0] }
        ],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c'],
        plotOptions: { bar: { borderRadius: 0, columnWidth: '70%', dataLabels: { position: 'top' } } },
        dataLabels: { enabled: true, formatter: (val) => val + "%", offsetY: -20, style: { fontSize: '11px', colors: ["#666"] } },
        xaxis: { categories: expenseGroups.slice(0, 6), labels: { style: { fontSize: '9px', fontWeight: 600 } } },
        yaxis: { max: 100, labels: { style: { fontSize: '9px' }, formatter: (val) => val + "%" } },
        legend: { position: 'bottom' },
        tooltip: {
            y: {
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                    const group = expenseGroups[dataPointIndex];
                    const row = sucessTableData.find(r => r.ano === 2026 && r.grupo === group);
                    if (row) {
                        const absValStr = seriesIndex === 0 ? row.emp : row.liq;
                        const num = parseFloat(absValStr.replace(' B', '').replace(',', '.'));
                        const fullVal = num * 1000000000;
                        const label = seriesIndex === 0 ? 'Empenhado' : 'Liquidado';
                        return `${val}% (${label}: ${fmtFull(fullVal)})`;
                    }
                    return val + "%";
                }
            }
        }
    }).render();

    // 3. Comparativo Despesa
    const compData = [
        { g: expenseGroups[0], o25: 12.00, a25: 12.50, e25: 12.10, l25: 11.80, o26: 15.00, a26: 14.20, e26: 13.50, l26: 8.20 },
        { g: expenseGroups[1], o25: 2.00, a25: 2.10, e25: 1.80, l25: 1.70, o26: 2.20, a26: 2.10, e26: 1.85, l26: 1.73 },
        { g: expenseGroups[2], o25: 7.00, a25: 7.80, e25: 7.10, l25: 6.40, o26: 8.50, a26: 8.40, e26: 7.76, l26: 5.88 },
        { g: expenseGroups[3], o25: 8.00, a25: 8.40, e25: 7.20, l25: 5.10, o26: 10.50, a26: 10.10, e26: 8.40, l26: 3.20 },
        { g: expenseGroups[4], o25: 0.40, a25: 0.45, e25: 0.35, l25: 0.20, o26: 0.60, a26: 0.50, e26: 0.38, l26: 0.23 },
        { g: expenseGroups[5], o25: 2.00, a25: 2.05, e25: 1.95, l25: 1.90, o26: 2.50, a26: 2.20, e26: 2.20, l26: 2.15 },
        { g: expenseGroups[6], o25: 0.50, a25: 0.00, e25: 0.00, l25: 0.00, o26: 0.80, a26: 0.00, e26: 0.00, l26: 0.00 }
    ];

    compData.sort((a, b) => b.l26 - a.l26);

    new ApexCharts(document.querySelector("#chart-comparativo"), {
        series: [
            { name: 'Liquidado 2025', data: compData.map(d => d.l25) },
            { name: 'Liquidado 2026', data: compData.map(d => d.l26) }
        ],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c'],
        plotOptions: {
            bar: {
                borderRadius: 2,
                columnWidth: '70%',
                dataLabels: { position: 'top' }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val > 0 ? "R$ " + val.toFixed(1) + " B" : "",
            offsetY: -20,
            style: { fontSize: '9px', colors: ["#475569"] }
        },
        xaxis: {
            categories: compData.map(d => d.g),
            labels: { rotate: -45, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: {
            show: true,
            labels: { style: { fontSize: '9px' }, formatter: (val) => "R$ " + val + " B" }
        },
        grid: { show: true, borderColor: '#f1f1f1', strokeDashArray: 4 },
        legend: { position: 'bottom', horizontalAlign: 'center', offsetY: 0 },
        tooltip: {
            y: {
                formatter: function (val) {
                    return fmtFull(val * 1000000000);
                }
            }
        }
    }).render();

    new ApexCharts(document.querySelector("#chart-po"), {
        series: [
            { name: 'Orçado', data: poList.map(p => p.o26 / 1e9) },
            { name: 'Autorizado', data: poList.map(p => p.a26 / 1e9) },
            { name: 'Empenhado', data: poList.map(p => p.e26 / 1e9) },
            { name: 'Liquidado', data: poList.map(p => p.l26 / 1e9) }
        ],
        chart: { type: 'bar', height: '100%', toolbar: { show: false }, stacked: false },
        colors: ['#cbd5e1', '#56c0d8', '#a372c4', '#1e3a8a'],
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '85%',
                borderRadius: 2,
                dataLabels: { position: 'top' }
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: poList.map(p => p.po),
            labels: { formatter: (val) => "R$ " + val + " B", style: { fontSize: '9px' } }
        },
        yaxis: { labels: { style: { fontSize: '9px', fontWeight: 600 } } },
        grid: { borderColor: '#f1f1f1', strokeDashArray: 4, xaxis: { lines: { show: true } } },
        legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '11px' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (val) {
                    return fmtFull(val * 1e9);
                }
            }
        }
    }).render();

    // --- Tables ---

    // A. Plano Orçamentário Table
    let tablePoHtml = '';
    let t_l24 = 0, t_o25 = 0, t_a25 = 0, t_e25 = 0, t_l25 = 0, t_o26 = 0, t_a26 = 0, t_e26 = 0, t_l26 = 0;
    poDataDetailed.forEach(d => {
        t_l24 += d.l24; t_o25 += d.o25; t_a25 += d.a25; t_e25 += d.e25; t_l25 += d.l25;
        t_o26 += d.o26; t_a26 += d.a26; t_e26 += d.e26; t_l26 += d.l26;
    });

    const fM = (v) => (v / 1000000).toFixed(1) + " M";
    const fB = (v) => (v / 1000000000).toFixed(2) + " B";
    const getF = (v) => v > 1000000000 ? fB(v) : fM(v);

    const calcVar = (curr, prev) => prev > 0 ? (((curr - prev) / prev) * 100).toFixed(1) : '0.0';
    const v25T = calcVar(t_l25, t_l24);
    const v26T = calcVar(t_l26, t_l25);

    // Total First
    tablePoHtml += `<tr class="row-total">
        <td>TOTAL</td>
        <td>${fB(t_o25)}</td><td>${fB(t_a25)}</td><td>${fB(t_e25)}</td><td>${fB(t_l25)}</td>
        <td>${v25T}%</td>
        <td style="background:rgba(30,58,138,0.05);">${fB(t_o26)}</td><td style="background:rgba(30,58,138,0.05);">${fB(t_a26)}</td><td style="background:rgba(30,58,138,0.05);">${fB(t_e26)}</td><td style="background:rgba(30,58,138,0.05);">${fB(t_l26)}</td>
        <td style="background:rgba(30,58,138,0.05);">${v26T}%</td>
    </tr>`;

    poDataDetailed.forEach(d => {
        const v25 = calcVar(d.l25, d.l24);
        const v26 = calcVar(d.l26, d.l25);
        tablePoHtml += `<tr>
            <td style="text-align:left; font-weight:600;">${d.po}</td>
            <td style="font-size:9px;">${getF(d.o25)}</td><td style="font-size:9px;">${getF(d.a25)}</td><td style="font-size:9px;">${getF(d.e25)}</td><td style="font-size:9px; background:#f8fafc;">${getF(d.l25)}</td>
            <td style="font-weight:bold;">${v25}%</td>
            <td style="font-size:9px;">${getF(d.o26)}</td><td style="font-size:9px;">${getF(d.a26)}</td><td style="font-size:9px;">${getF(d.e26)}</td><td style="font-size:9px; background:rgba(30,58,138,0.05); font-weight:bold; color:#1e3a8a;">${getF(d.l26)}</td>
            <td style="font-weight:bold; background:rgba(30,58,138,0.05);">${v26}%</td>
        </tr>`;
    });
    popTab('table-po-detalhado', tablePoHtml);

    // B. Sucesso Planejamento Table
    // ... stay as is ... (Sucesso already has 11 columns in index.html matching the 2nd request)
    // Wait, I should make sure I don't break the Sucesso logic.
    let tableSucessoHtml = '';
    const sData = [
        { g: expenseGroups[0], a25: '12.50 B', e25: '12.10 B', l25: '11.80 B', a26: '14.20 B', e26: '13.50 B', l26: '8.20 B' },
        { g: expenseGroups[1], a25: '2.00 B', e25: '1.80 B', l25: '1.70 B', a26: '2.10 B', e26: '1.85 B', l26: '1.73 B' },
        { g: expenseGroups[2], a25: '7.50 B', e25: '7.10 B', l25: '6.40 B', a26: '8.40 B', e26: '7.76 B', l26: '5.88 B' },
        { g: expenseGroups[3], a25: '8.40 B', e25: '7.20 B', l25: '5.10 B', a26: '10.10 B', e26: '8.40 B', l26: '3.20 B' },
        { g: expenseGroups[4], a25: '0.45 B', e25: '0.35 B', l25: '0.23 B', a26: '0.50 B', e26: '0.38 B', l26: '0.23 B' },
        { g: expenseGroups[5], a25: '2.05 B', e25: '1.95 B', l25: '1.90 B', a26: '2.20 B', e26: '2.20 B', l26: '2.15 B' }
    ];

    const pS = (v) => parseFloat(v.replace(' B', ''));
    const pC = (v, a) => ((pS(v) / pS(a)) * 100).toFixed(1) + "%";

    // Sucesso Total Calculation
    let st = { a25: 0, e25: 0, l25: 0, a26: 0, e26: 0, l26: 0 };
    sData.forEach(d => {
        st.a25 += pS(d.a25); st.e25 += pS(d.e25); st.l25 += pS(d.l25);
        st.a26 += pS(d.a26); st.e26 += pS(d.e26); st.l26 += pS(d.l26);
    });

    tableSucessoHtml += `<tr class="row-total">
        <td>TOTAL</td>
        <td>${st.a25.toFixed(2)} B</td><td>${st.e25.toFixed(2)} B</td><td>${st.l25.toFixed(2)} B</td>
        <td>${((st.e25/st.a25)*100).toFixed(1)}%</td><td>${((st.l25/st.a25)*100).toFixed(1)}%</td>
        <td>${st.a26.toFixed(2)} B</td><td>${st.e26.toFixed(2)} B</td><td>${st.l26.toFixed(2)} B</td>
        <td>${((st.e26/st.a26)*100).toFixed(1)}%</td><td>${((st.l26/st.a26)*100).toFixed(1)}%</td>
    </tr>`;

    sData.forEach(d => {
        tableSucessoHtml += `<tr>
            <td style="text-align:left; font-weight:600;">${d.g}</td>
            <td style="font-size:9px;">${d.a25}</td><td style="font-size:9px;">${d.e25}</td><td style="font-size:9px;">${d.l25}</td><td style="font-size:9px;">${pC(d.e25, d.a25)}</td><td style="font-size:9px;">${pC(d.l25, d.a25)}</td>
            <td style="font-size:9px;">${d.a26}</td><td style="font-size:9px;">${d.e26}</td><td style="font-size:9px;">${d.l26}</td><td style="font-size:9px; font-weight:bold;">${pC(d.e26, d.a26)}</td><td style="font-size:9px; font-weight:bold;">${pC(d.l26, d.a26)}</td>
        </tr>`;
    });
    popTab('table-sucesso-detalhado', tableSucessoHtml);

    // C. Comparativo Despesa Table
    let compHtml = '';
    let tc = { o25: 0, a25: 0, e25: 0, l25: 0, o26: 0, a26: 0, e26: 0, l26: 0 };
    compData.forEach(d => {
        tc.o25 += d.o25; tc.a25 += d.a25; tc.e25 += d.e25; tc.l25 += d.l25;
        tc.o26 += d.o26; tc.a26 += d.a26; tc.e26 += d.e26; tc.l26 += d.l26;
    });
    const v25TC = calcVar(tc.l25, (tc.l25 * 0.9));
    const v26TC = calcVar(tc.l26, tc.l25);

    // Total Row
    compHtml += `<tr class="row-total">
        <td>TOTAL</td>
        <td>${fV(tc.o25)}</td><td>${fV(tc.a25)}</td><td>${fV(tc.e25)}</td><td>${fV(tc.l25)}</td>
        <td>${v25TC}%</td>
        <td style="background:rgba(30,58,138,0.05);">${fV(tc.o26)}</td><td style="background:rgba(30,58,138,0.05);">${fV(tc.a26)}</td><td style="background:rgba(30,58,138,0.05);">${fV(tc.e26)}</td><td style="background:rgba(30,58,138,0.05); color:#1e3a8a;">${fV(tc.l26)}</td>
        <td style="background:rgba(30,58,138,0.05);">${v26TC}%</td>
    </tr>`;

    compData.forEach(d => {
        const v25 = calcVar(d.l25, (d.l25 * 0.9)); // Mocked 2024
        const v26 = calcVar(d.l26, d.l25);
        compHtml += `<tr>
            <td style="text-align:left; font-weight:600;">${d.g}</td>
            <td style="font-size:9px;">${fV(d.o25)}</td>
            <td style="font-size:9px;">${fV(d.a25)}</td>
            <td style="font-size:9px;">${fV(d.e25)}</td>
            <td style="font-size:9px; background:#f8fafc;">${fV(d.l25)}</td>
            <td style="font-weight:bold;">${v25}%</td>
            <td style="font-size:9px;">${fV(d.o26)}</td>
            <td style="font-size:9px;">${fV(d.a26)}</td>
            <td style="font-size:9px;">${fV(d.e26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05); font-weight:bold; color:#1e3a8a;">${fV(d.l26)}</td>
            <td style="font-weight:bold; background:rgba(30,58,138,0.05);">${v26}%</td>
        </tr>`;
    });
    popTab('table-despesa-comparativo', compHtml);

    // D. Disponibilidade Table
    popTab('table-dispo', dispoData.categories.map((cat, i) => `<tr><td style="text-align:left;">${cat}</td><td class="text-end fw-bold">R$ ${dispoData.values[i]} B</td></tr>`).join(''));

    // --- Handlers ---
    document.querySelectorAll('.flip-trigger').forEach(btn => { btn.onclick = function () { const card = this.closest('.card-chart-standard').querySelector('.flip-card'); if (card) card.classList.toggle('flipped'); }; });
    document.querySelectorAll('.expand-trigger').forEach(btn => { btn.onclick = function () { const card = this.closest('.card-chart-standard'); card.classList.toggle('fullscreen-card'); this.classList.toggle('fa-expand'); this.classList.toggle('fa-compress'); if (card.classList.contains('fullscreen-card')) document.body.style.overflow = 'hidden'; else document.body.style.overflow = 'auto'; setTimeout(() => window.dispatchEvent(new Event('resize')), 300); }; });

    // Filter Chips
    const tagsContainer = document.getElementById('filter-tags-container');
    const filterRefs = {
        ano: document.getElementById('filter-ano'),
        mes: document.getElementById('filter-mes'),
        uo: document.getElementById('filter-uo'),
        tipoFonte: document.getElementById('filter-tipo-fonte'),
        gd: document.getElementById('filter-gd'),
        fonteCompleta: document.getElementById('filter-fonte-completa'),
        emenda: document.getElementById('filter-emenda'),
        acao: document.getElementById('filter-acao')
    };

    function updateChips() {
        if (!tagsContainer) return; tagsContainer.innerHTML = '';
        Object.keys(filterRefs).forEach(key => {
            const el = filterRefs[key]; if (!el) return;
            let val = '';
            if (el.tagName === 'SELECT') {
                const selected = Array.from(el.selectedOptions).map(opt => opt.value);
                if (selected.length > 0 && selected[0] !== '' && selected[0] !== 'Todos' && selected[0] !== 'Todas') val = selected.join('; ');
            } else {
                val = el.value.trim();
            }

            if (val) {
                const chip = document.createElement('div'); chip.className = 'filter-tag';
                let label = key.toUpperCase();
                if (key === 'mes') label = 'PERÍODO MENSAL';
                if (key === 'uo') label = 'UNIDADE ORÇAMENTÁRIA';
                if (key === 'ano') label = 'ANO';
                if (key === 'tipoFonte') label = 'TIPO DE FONTE';
                if (key === 'gd') label = 'GRUPO DE DESPESA';
                if (key === 'fonteCompleta') label = 'FONTE COMPLETA';
                if (key === 'emenda') label = 'EMENDA PARLAMENTAR';
                if (key === 'acao') label = 'AÇÃO ORÇAMENTÁRIA';

                chip.innerHTML = `<div class="d-flex flex-column"><div class="tag-label">${label}:</div><div class="tag-value">${val}</div></div>`;
                if (key !== 'ano') chip.innerHTML += `<button class="remove-tag" data-key="${key}">X</button>`;
                tagsContainer.appendChild(chip);
            }
        });

        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.onclick = function () {
                const key = this.getAttribute('data-key');
                const el = filterRefs[key];
                if (el.tagName === 'SELECT') {
                    if (el.multiple) Array.from(el.options).forEach(opt => opt.selected = false); else el.selectedIndex = 0;
                } else {
                    el.value = '';
                }
                updateChips();
            };
        });
    }

    document.getElementById('btn-filtrar')?.addEventListener('click', updateChips);
    document.getElementById('btn-restaurar')?.addEventListener('click', function () {
        Object.keys(filterRefs).forEach(key => {
            const el = filterRefs[key];
            if (el.tagName === 'SELECT') {
                if (key === 'ano') el.value = '2026';
                else if (el.multiple) Array.from(el.options).forEach(opt => opt.selected = false);
                else el.selectedIndex = 0;
            } else {
                el.value = '';
            }
        });
        updateChips();
    });
    updateChips();
});
