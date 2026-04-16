document.addEventListener('DOMContentLoaded', function () {
    // --- Mock Data ---
    const dispoData = {
        categories: ['Disponível', 'Disponível sem Reserva', 'Disponível com Reserva', 'Empenhado a Liquidar'],
        values: [32.03, 25.10, 6.93, 15.45]
    };

    const expenseGroups = [
        '1 - PESSOAL E ENCARGOS SOCIAIS', '2 - JUROS E ENCARGOS DA DÍVIDA', '3 - OUTRAS DESPESAS CORRENTES',
        '4 - INVESTIMENTOS', '5 - INVERSÕES FINANCEIRAS', '6 - AMORTIZAÇÃO DA DÍVIDA', '9 - RESERVA DE CONTINGÊNCIA'
    ];

    const poDataDetailed = [
        { po: '000001 - N. DEF.', o25: 450000000, a25: 420000000, e25: 380000000, l25: 250000000, l24: 220000000, o26: 480000000, a26: 450000000, e26: 350000000, l26: 300000000 },
        { po: '003339 - SEP', o25: 8200000000, a25: 9100000000, e25: 8500000000, l25: 5200000000, l24: 4800000000, o26: 8500000000, a26: 9200000000, e26: 8800000000, l26: 5500000000 },
        { po: '002778 - TI', o25: 6100000000, a25: 6100000000, e25: 5800000000, l25: 3100000000, l24: 2900000000, o26: 6200000000, a26: 6150000000, e26: 5900000000, l26: 3400000000 },
        { po: '001676 - ADM. UNID', o25: 3500000000, a25: 4200000000, e25: 3100000000, l25: 1200000000, l24: 1500000000, o26: 3800000000, a26: 4400000000, e26: 3500000000, l26: 1800000000 },
        { po: '000002 - D. OBRIG.', o25: 28000000000, a25: 28000000000, e25: 25000000000, l25: 18000000000, l24: 17000000000, o26: 30000000000, a26: 30000000000, e26: 28000000000, l26: 22000000000 },
        { po: '003213 - SEGER', o25: 1200000000, a25: 1200000000, e25: 1100000000, l25: 900000000, l24: 850000000, o26: 1300000000, a26: 1250000000, e26: 1150000000, l26: 1050000000 }
    ];
    const poList = [...poDataDetailed].sort((a, b) => b.a26 - a.a26);

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
        { ano: 2025, grupo: expenseGroups[3], aut: '8,40 B', emp: '7,20 B', liq: '5,10 B', p_emp: '85,7%', p_liq: '60,7%' },
        // Mock 2024
        { ano: 2024, grupo: expenseGroups[0], aut: '11,50 B', emp: '10,58 B', liq: '10,12 B', p_emp: '92,0%', p_liq: '88,0%' },
        { ano: 2024, grupo: expenseGroups[1], aut: '1,90 B',  emp: '1,61 B',  liq: '1,55 B',  p_emp: '85,0%', p_liq: '82,0%' },
        { ano: 2024, grupo: expenseGroups[2], aut: '6,50 B',  emp: '5,85 B',  liq: '5,20 B',  p_emp: '90,0%', p_liq: '80,0%' },
        { ano: 2024, grupo: expenseGroups[3], aut: '7,40 B',  emp: '7,40 B',  liq: '7,03 B',  p_emp: '100,0%', p_liq: '95,0%' },
        { ano: 2024, grupo: expenseGroups[4], aut: '0,40 B',  emp: '0,28 B',  liq: '0,26 B',  p_emp: '70,0%', p_liq: '65,0%' },
        { ano: 2024, grupo: expenseGroups[5], aut: '1,80 B',  emp: '1,44 B',  liq: '1,35 B',  p_emp: '80,0%', p_liq: '75,0%' },
        // Mock 2023
        { ano: 2023, grupo: expenseGroups[0], aut: '10,50 B', emp: '9,24 B', liq: '8,92 B', p_emp: '88,0%', p_liq: '85,0%' },
        { ano: 2023, grupo: expenseGroups[1], aut: '1,80 B',  emp: '1,44 B', liq: '1,40 B', p_emp: '80,0%', p_liq: '78,0%' },
        { ano: 2023, grupo: expenseGroups[2], aut: '5,50 B',  emp: '4,67 B', liq: '4,12 B', p_emp: '85,0%', p_liq: '75,0%' },
        { ano: 2023, grupo: expenseGroups[3], aut: '6,40 B',  emp: '5,76 B', liq: '5,44 B', p_emp: '90,0%', p_liq: '85,0%' },
        { ano: 2023, grupo: expenseGroups[4], aut: '0,35 B',  emp: '0,22 B', liq: '0,21 B', p_emp: '65,0%', p_liq: '60,0%' },
        { ano: 2023, grupo: expenseGroups[5], aut: '1,50 B',  emp: '1,12 B', liq: '1,05 B', p_emp: '75,0%', p_liq: '70,0%' }
    ];

    const fmtB = (v) => "R$ " + (v / 1000000000).toFixed(2) + " B";
    const fmtFull = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    const fV = (v) => v.toFixed(2) + " B";
    const popTab = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    // --- Shared Premium Tooltip ---
    const buildTooltip = (title, subtitle, series, w, dataPointIndex) => {
        let rowsHtml = '';
        series.forEach((sVal, i) => {
            const seriesName = w.globals.seriesNames[i];
            const color = w.config.colors[i];
            const val = sVal[dataPointIndex];
            const formattedVal = val > 100 ? fmtFull(val * 1e9) : (val.toFixed(1) + "%");
            rowsHtml += `<div class="tooltip-row active"><span class="dot" style="background:${color}"></span><span class="label">${seriesName}</span><span class="val">${formattedVal}</span></div>`;
        });
        return `<div class="premium-tooltip"><div class="tooltip-header"><div class="uo-info">${title}</div><div class="exercise-info">${subtitle}</div></div><div class="tooltip-body">${rowsHtml}</div></div>`;
    };

    // --- Charts (Only 2026) ---

    // 1. Disponibilidades
    new ApexCharts(document.querySelector("#chart-dispo"), {
        series: [{ name: 'Valor', data: dispoData.values }],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c', '#56a380', '#a372c4'],
        plotOptions: { bar: { borderRadius: 0, horizontal: false, distributed: true, dataLabels: { position: 'top' } } },
        dataLabels: { enabled: false },
        xaxis: {
            categories: dispoData.categories,
            labels: { rotate: 0, trim: true, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: { show: true, labels: { formatter: (val) => "R$ " + val + " B" } },
        grid: { show: true, borderColor: '#f1f1f1' },
        legend: { show: true, position: 'bottom', markers: { radius: 4 } },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }) {
                const label = w.globals.labels[dataPointIndex];
                return buildTooltip(label, "Exercício 2026", series, w, dataPointIndex);
            }
        }
    }).render();

    function getSuccessChartOptions(selectedYears = ['2026']) {
        const groups = expenseGroups.slice(0, 6);
        const series = [];
        const colors = ['#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b', '#06b6d4', '#10b981'];

        groups.forEach((g, i) => {
            const shortName = g.split('-')[1].trim();
            const liqData = [];
            const empDiffData = [];

            selectedYears.forEach(year => {
                const item = sucessTableData.find(d => d.ano === parseInt(year) && d.grupo.includes(g.split(' ')[0]));
                const emp = item ? parseFloat(item.p_emp.toString().replace('%','').replace(',','.')) : 0;
                const liq = item ? parseFloat(item.p_liq.toString().replace('%','').replace(',','.')) : 0;
                
                liqData.push(liq);
                empDiffData.push(Math.max(0, emp - liq)); // A liquidar (Empenhado não liquidado)
            });

            // 1. Parte Inferior (Liquidado)
            series.push({
                name: `${shortName} (Liquidado)`,
                type: 'bar',
                stack: `stack_${i}`,
                data: liqData,
                itemStyle: { color: colors[i] },
                label: { 
                    show: true, 
                    position: 'inside', 
                    fontSize: 8, 
                    color: '#fff',
                    formatter: (params) => params.value > 0 ? params.value.toFixed(1) + '%' : '' 
                }
            });

            // 2. Parte do Meio (Empenhado a Liquidar)
            series.push({
                name: `${shortName} (A Liquidar)`,
                type: 'bar',
                stack: `stack_${i}`,
                data: empDiffData,
                itemStyle: { color: colors[i], opacity: 0.5 },
                label: { 
                    show: true, 
                    position: 'inside', 
                    fontSize: 8,
                    color: '#fff',
                    formatter: (params) => params.value > 0 ? params.value.toFixed(1) + '%' : ''
                }
            });
        });

        return {
            legend: { top: '0%', type: 'scroll', textStyle: { fontSize: 9 } },
            tooltip: { 
                trigger: 'item', 
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderWidth: 0,
                padding: 0,
                textStyle: { color: 'inherit' },
                extraCssText: 'box-shadow: none;',
                formatter: function (params) {
                    const yearIndex = params.dataIndex;
                    const groupSeriesName = params.seriesName.replace(' (Liquidado)','').replace(' (A Liquidar)','');
                    const myStack = series.find(s => s.name === params.seriesName).stack;
                    const groupSeries = series.filter(s => s.stack === myStack);

                    const liqSeries = groupSeries.find(s => s.name.includes('(Liquidado)'));
                    const empDiffSeries = groupSeries.find(s => s.name.includes('(A Liquidar)'));
                    
                    const liqVal = liqSeries ? liqSeries.data[yearIndex] : 0;
                    const empDiffVal = empDiffSeries ? empDiffSeries.data[yearIndex] : 0;
                    const totalEmp = liqVal + empDiffVal;
                    const color = liqSeries ? liqSeries.itemStyle.color : '#000';

                    let rowsHtml = '';
                    rowsHtml += `<div class="tooltip-row active" style="margin-bottom: 4px;"><span class="dot" style="background:${color}"></span><span class="label">Empenhado</span><span class="val" style="margin-left: 15px;">${totalEmp.toFixed(1)}%</span></div>`;
                    rowsHtml += `<div class="tooltip-row active"><span class="dot" style="background:${color}; opacity: 0.7;"></span><span class="label">Liquidado</span><span class="val" style="margin-left: 15px;">${liqVal.toFixed(1)}%</span></div>`;

                    return `
                        <div class="premium-tooltip" style="position:relative; z-index:9999;">
                            <div class="tooltip-header">
                                <div class="uo-info">${groupSeriesName}</div>
                                <div class="exercise-info">Exercício ${params.name}</div>
                            </div>
                            <div class="tooltip-body">
                                ${rowsHtml}
                            </div>
                        </div>
                    `;
                }
            },
            grid: { bottom: '15%', top: '25%', left: '5%', right: '5%', containLabel: true },
            xAxis: { 
                type: 'category', 
                data: selectedYears,
                axisLabel: { fontSize: 12, fontWeight: 'bold' } 
            },
            yAxis: { max: 100, axisLabel: { fontSize: 8, formatter: '{value}%' } },
            dataZoom: [
                { type: 'inside' },
                { 
                    type: 'slider', bottom: '2%', height: 12,
                    start: 0, end: 100
                }
            ],
            series: series
        };
    }

    const successChartDom = document.querySelector("#chart-sucesso");
    let successChart = null;
    if (successChartDom && typeof echarts !== 'undefined') {
        try {
            successChart = echarts.init(successChartDom);
            successChart.setOption(getSuccessChartOptions(['2026']));
            window.addEventListener('resize', () => successChart.resize());
        } catch (e) {
            console.error("Erro ECharts:", e);
        }
    }

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
        plotOptions: { bar: { borderRadius: 0, columnWidth: '70%', dataLabels: { position: 'top' } } },
        dataLabels: { enabled: false },
        xaxis: {
            categories: compData.map(d => d.g),
            labels: { rotate: 0, trim: true, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: {
            show: true,
            labels: { style: { fontSize: '9px' }, formatter: (val) => "R$ " + val + " B" }
        },
        grid: { show: true, borderColor: '#f1f1f1', strokeDashArray: 4 },
        legend: { position: 'bottom', horizontalAlign: 'center', offsetY: 0, markers: { radius: 4 } },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }) {
                const group = compData[dataPointIndex].g;
                return buildTooltip(group, "Comparativo Realizado", series, w, dataPointIndex);
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
                borderRadius: 0,
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
        legend: { position: 'bottom', horizontalAlign: 'center', fontSize: '11px', markers: { radius: 4 } },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }) {
                const poName = poList[dataPointIndex].po;
                return buildTooltip(poName, "Plano Orçamentário 2026", series, w, dataPointIndex);
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
        <td title="Valor Total Acumulado">TOTAL</td>
        <td title="${fmtFull(t_o25)}">${fB(t_o25)}</td>
        <td title="${fmtFull(t_a25)}">${fB(t_a25)}</td>
        <td title="${fmtFull(t_e25)}">${fB(t_e25)}</td>
        <td title="${fmtFull(t_l25)}">${fB(t_l25)}</td>
        <td title="Variação Percentual: ${v25T}%">${v25T}%</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_o26)}">${fB(t_o26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_a26)}">${fB(t_a26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_e26)}">${fB(t_e26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_l26)}">${fB(t_l26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="Variação Percentual: ${v26T}%">${v26T}%</td>
    </tr>`;

    poList.forEach(d => {
        const v25 = calcVar(d.l25, d.l24);
        const v26 = calcVar(d.l26, d.l25);
        tablePoHtml += `<tr>
            <td style="text-align:left; font-weight:600;" title="${d.po}">${d.po}</td>
            <td style="font-size:9px;" title="${fmtFull(d.o25)}">${getF(d.o25)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.a25)}">${getF(d.a25)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.e25)}">${getF(d.e25)}</td>
            <td style="font-size:9px; background:#f8fafc;" title="${fmtFull(d.l25)}">${getF(d.l25)}</td>
            <td style="font-weight:bold;" title="Variação: ${v25}%">${v25}%</td>
            <td style="font-size:9px;" title="${fmtFull(d.o26)}">${getF(d.o26)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.a26)}">${getF(d.a26)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.e26)}">${getF(d.e26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05); font-weight:bold; color:#1e3a8a;" title="${fmtFull(d.l26)}">${getF(d.l26)}</td>
            <td style="font-weight:bold; background:rgba(30,58,138,0.05);" title="Variação: ${v26}%">${v26}%</td>
        </tr>`;
    });
    popTab('table-po-detalhado', tablePoHtml);

    // B. Sucesso Planejamento Table (Dynamic)
    function renderSucessoTable(years) {
        const sortedYears = [...years].sort(); // ASC order
        let theadHtml = `<tr><th rowspan="2" style="vertical-align: middle;">Grupo de Despesa</th>`;
        
        sortedYears.forEach(y => {
            const isLatest = (y === sortedYears[sortedYears.length - 1]);
            const bgClass = isLatest ? 'style="background: #1e3a8a;" class="text-center text-white"' : 'class="text-center table-active"';
            theadHtml += `<th colspan="5" ${bgClass}>${y}</th>`;
        });
        theadHtml += `</tr><tr>`;
        
        sortedYears.forEach(y => {
            theadHtml += `
                <th style="font-size: 8px;">Autorizado</th>
                <th style="font-size: 8px;">Empenhado</th>
                <th style="font-size: 8px;">Liquidado</th>
                <th style="font-size: 8px;">Empenhado/Autorizado</th>
                <th style="font-size: 8px;">Liquidado/Autorizado</th>
            `;
        });
        theadHtml += `</tr>`;
        popTab('thead-sucesso', theadHtml);

        const pS = (v) => parseFloat(v.toString().replace(' B', '').replace(/\./g, '').replace(',', '.'));
        const pFull = (v) => fmtFull(pS(v) * 1e9);

        // calculate totals per year
        let totals = {};
        sortedYears.forEach(y => { totals[y] = { a: 0, e: 0, l: 0 }; });

        expenseGroups.slice(0,6).forEach(g => {
            sortedYears.forEach(y => {
                const item = sucessTableData.find(d => d.ano === parseInt(y) && d.grupo === g);
                if(item) {
                     totals[y].a += pS(item.aut||0);
                     totals[y].e += pS(item.emp||0);
                     totals[y].l += pS(item.liq||0);
                }
            });
        });

        let tbodyHtml = `<tr class="row-total"><td title="Valores Totais">TOTAL</td>`;
        sortedYears.forEach(y => {
            const t = totals[y];
            tbodyHtml += `
                <td title="${fmtFull(t.a * 1e9)}">${t.a.toFixed(2).replace('.', ',')} B</td>
                <td title="${fmtFull(t.e * 1e9)}">${t.e.toFixed(2).replace('.', ',')} B</td>
                <td title="${fmtFull(t.l * 1e9)}">${t.l.toFixed(2).replace('.', ',')} B</td>
                <td title="Eficiência Empenho: ${((t.e / t.a) * 100).toFixed(1)}%">${((t.e / t.a) * 100).toFixed(1).replace('.', ',')}%</td>
                <td title="Eficiência Liquidação: ${((t.l / t.a) * 100).toFixed(1)}%">${((t.l / t.a) * 100).toFixed(1).replace('.', ',')}%</td>
            `;
        });
        tbodyHtml += `</tr>`;

        expenseGroups.slice(0,6).forEach(g => {
            tbodyHtml += `<tr><td style="text-align:left; font-weight:600;" title="${g}">${g}</td>`;
            sortedYears.forEach(y => {
                const item = sucessTableData.find(d => d.ano === parseInt(y) && d.grupo === g);
                if (item) {
                    tbodyHtml += `
                        <td style="font-size:9px;" title="${pFull(item.aut)}">${item.aut}</td>
                        <td style="font-size:9px;" title="${pFull(item.emp)}">${item.emp}</td>
                        <td style="font-size:9px;" title="${pFull(item.liq)}">${item.liq}</td>
                        <td style="font-size:9px;" title="Eficiência: ${item.p_emp}">${item.p_emp}</td>
                        <td style="font-size:9px; font-weight:bold" title="Eficiência: ${item.p_liq}">${item.p_liq}</td>
                    `;
                } else {
                    tbodyHtml += `<td colspan="5" class="text-muted text-center" style="font-size:9px;">Sem Dados</td>`;
                }
            });
            tbodyHtml += `</tr>`;
        });
        
        popTab('table-sucesso-detalhado', tbodyHtml);
    }
    
    renderSucessoTable(['2025', '2026']); // Render inicial

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
        <td title="Somas Totais">TOTAL</td>
        <td title="${fmtFull(tc.o25 * 1e9)}">${fV(tc.o25)}</td>
        <td title="${fmtFull(tc.a25 * 1e9)}">${fV(tc.a25)}</td>
        <td title="${fmtFull(tc.e25 * 1e9)}">${fV(tc.e25)}</td>
        <td title="${fmtFull(tc.l25 * 1e9)}">${fV(tc.l25)}</td>
        <td title="Variação Geral: ${v25TC}%">${v25TC}%</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(tc.o26 * 1e9)}">${fV(tc.o26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(tc.a26 * 1e9)}">${fV(tc.a26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(tc.e26 * 1e9)}">${fV(tc.e26)}</td>
        <td style="background:rgba(30,58,138,0.05); color:#1e3a8a;" title="${fmtFull(tc.l26 * 1e9)}">${fV(tc.l26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="Variação Geral: ${v26TC}%">${v26TC}%</td>
    </tr>`;

    compData.forEach(d => {
        const v25 = calcVar(d.l25, (d.l25 * 0.9)); // Mocked 2024
        const v26 = calcVar(d.l26, d.l25);
        compHtml += `<tr>
            <td style="text-align:left; font-weight:600;" title="${d.g}">${d.g}</td>
            <td style="font-size:9px;" title="${fmtFull(d.o25 * 1e9)}">${fV(d.o25)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.a25 * 1e9)}">${fV(d.a25)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.e25 * 1e9)}">${fV(d.e25)}</td>
            <td style="font-size:9px; background:#f8fafc;" title="${fmtFull(d.l25 * 1e9)}">${fV(d.l25)}</td>
            <td style="font-weight:bold;" title="Variação: ${v25}%">${v25}%</td>
            <td style="font-size:9px;" title="${fmtFull(d.o26 * 1e9)}">${fV(d.o26)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.a26 * 1e9)}">${fV(d.a26)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.e26 * 1e9)}">${fV(d.e26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05); font-weight:bold; color:#1e3a8a;" title="${fmtFull(d.l26 * 1e9)}">${fV(d.l26)}</td>
            <td style="font-weight:bold; background:rgba(30,58,138,0.05);" title="Variação: ${v26}%">${v26}%</td>
        </tr>`;
    });
    popTab('table-despesa-comparativo', compHtml);

    // D. Disponibilidade Table
    popTab('table-dispo', dispoData.categories.map((cat, i) => {
        const fullVal = dispoData.values[i] * 1e9;
        return `<tr><td style="text-align:left;" title="${cat}">${cat}</td><td class="text-end fw-bold" title="${fmtFull(fullVal)}">R$ ${dispoData.values[i]} B</td></tr>`;
    }).join(''));

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
                const validSelected = Array.from(el.selectedOptions).map(opt => opt.value).filter(v => v !== '' && v !== 'Todos' && v !== 'Todas' && !v.includes('0 selecionados') && !v.includes('3 selecionados'));
                if (validSelected.length > 0) val = validSelected.join('; ');
            } else {
                val = el.value.trim();
            }

            if (val) {
                const chip = document.createElement('div'); chip.className = 'filter-tag';
                let label = key;
                if (key === 'mes') label = 'Mês';
                if (key === 'uo') label = 'UO';
                if (key === 'ano') label = 'Ano';
                if (key === 'tipoFonte') label = 'Fonte';
                if (key === 'gd') label = 'Grupo de Desp.';
                if (key === 'fonteCompleta') label = 'Fonte Completa';
                if (key === 'emenda') label = 'Emenda';
                if (key === 'acao') label = 'Ação';

                chip.innerHTML = `<div class="d-flex flex-column"><div class="tag-label">${label}:</div><div class="tag-value">${val}</div></div>`;
                chip.innerHTML += `<button class="remove-tag" data-key="${key}">X</button>`;
                tagsContainer.appendChild(chip);
            }
        });

        document.querySelectorAll('.remove-tag').forEach(btn => {
            btn.onclick = function () {
                const key = this.getAttribute('data-key');
                const el = filterRefs[key];
                if (el.tagName === 'SELECT' && window.choicesMap && choicesMap.has(el.id)) {
                    const c = choicesMap.get(el.id);
                    c.removeActiveItems();
                } else if (el.tagName === 'SELECT') {
                    if (el.multiple) Array.from(el.options).forEach(opt => opt.selected = false); else el.selectedIndex = 0;
                } else {
                    el.value = '';
                }
                updateChips();
            };
        });
    }

    document.getElementById('btn-filtrar')?.addEventListener('click', function() {
        updateChips();
        const selectedYears = Array.from(filterRefs.ano.selectedOptions).map(opt => opt.value).filter(v => v !== '');
        const yearsToUse = selectedYears.length > 0 ? selectedYears : ['2026'];
        
        if (successChart) successChart.setOption(getSuccessChartOptions(yearsToUse));
        renderSucessoTable(yearsToUse); // Atualiza a tabela com os anos filtrados
    });
    document.getElementById('btn-restaurar')?.addEventListener('click', function () {
        Object.keys(filterRefs).forEach(key => {
            const el = filterRefs[key];
            if (el.tagName === 'SELECT' && window.choicesMap && choicesMap.has(el.id)) {
                choicesMap.get(el.id).removeActiveItems();
                if (key === 'ano') {
                    choicesMap.get(el.id).setChoiceByValue('2026');
                }
            } else if (el.tagName === 'SELECT') {
                if (key === 'ano') el.value = '2026';
                else if (el.multiple) Array.from(el.options).forEach(opt => opt.selected = false);
                else el.selectedIndex = 0;
            } else {
                el.value = '';
            }
        });
        updateChips();
        if (successChart) successChart.setOption(getSuccessChartOptions(['2026']));
        renderSucessoTable(['2026']);
    });
    
    // Inicializar Choices.js Premium
    window.choicesMap = new Map();
    document.querySelectorAll('select.custom-select-filter').forEach(el => {
        const c = new Choices(el, {
            removeItemButton: true,
            searchEnabled: el.multiple,
            searchPlaceholderValue: "Buscar...",
            noResultsText: "Nada encontrado",
            itemSelectText: "",
            shouldSort: false
        });
        choicesMap.set(el.id, c);
    });

    updateChips();
});
