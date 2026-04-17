document.addEventListener('DOMContentLoaded', function () {
    // --- Mock Data ---
    const dispoData = {
        categories: ['Disponível', 'Disponível sem Reserva', 'Disponível com Reserva', 'Empenhado a Liquidar'],
        values: [3196600.71, 1559073.20, 1637527.51, 10714855.18]
    };

    const expenseGroups = [
        '1 - PESSOAL E ENCARGOS SOCIAIS', '2 - JUROS E ENCARGOS DA DÍVIDA', '3 - OUTRAS DESPESAS CORRENTES',
        '4 - INVESTIMENTOS', '5 - INVERSÕES FINANCEIRAS', '6 - AMORTIZAÇÃO DA DÍVIDA', '9 - RESERVA DE CONTINGÊNCIA',
        'R1 - RECEITAS CORRENTES', 'R2 - RECEITAS DE CAPITAL'
    ];

    const poDataDetailed = [
        { po: '000001 - N. DEF.', o23: 380000, a23: 350000, e23: 310000, l23: 190000, o24: 420000, a24: 400000, e24: 350000, l24: 220000, o25: 450000, a25: 420000, e25: 380000, l25: 250000, o26: 480000, a26: 450000, e26: 350000, l26: 300000 },
        { po: '003339 - SEP', o23: 7500000, a23: 8200000, e23: 7800000, l23: 4500000, o24: 7800000, a24: 8500000, e24: 8000000, l24: 4800000, o25: 8200000, a25: 9100000, e25: 8500000, l25: 5200000, o26: 8500000, a26: 9200000, e26: 8800000, l26: 5500000 },
        { po: '002778 - TI', o23: 5500000, a23: 5500000, e23: 5200000, l23: 2600000, o24: 5800000, a24: 5800000, e24: 5500000, l24: 2900000, o25: 6100000, a25: 6100000, e25: 5800000, l25: 3100000, o26: 6200000, a26: 6150000, e26: 5900000, l26: 3400000 },
        { po: '001676 - ADM. UNID', o23: 2900000, a23: 3500000, e23: 2800000, l23: 1300000, o24: 3200000, a24: 3800000, e24: 3000000, l24: 1500000, o25: 3500000, a25: 4200000, e25: 3100000, l25: 1200000, o26: 3800000, a26: 4400000, e26: 3500000, l26: 1800000 },
        { po: '000002 - D. OBRIG.', o23: 2200000, a23: 2200000, e23: 1900000, l23: 1500000, o24: 2500000, a24: 2500000, e24: 2200000, l24: 1700000, o25: 2800000, a25: 2800000, e25: 2500000, l25: 1800000, o26: 3000000, a26: 3000000, e26: 2800000, l26: 2200000 },
        { po: '003213 - SEGER', o23: 1000000, a23: 1000000, e23: 900000, l23: 800000, o24: 1100000, a24: 1100000, e24: 1000000, l24: 850000, o25: 1200000, a25: 1200000, e25: 1100000, l25: 900000, o26: 1300000, a26: 1250000, e26: 1150000, l26: 1050000 }
    ];
    const poList = [...poDataDetailed].sort((a, b) => b.a26 - a.a26);

    const sucessTableData = [
        { ano: 2026, grupo: expenseGroups[0], aut: '13,00 mi', emp: '12,39 mi', liq: '2,95 mi', p_emp: '95,34%', p_liq: '22,70%' },
        { ano: 2026, grupo: expenseGroups[1], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2026, grupo: expenseGroups[2], aut: '4,40 mi', emp: '1,89 mi', liq: '0,56 mi', p_emp: '42,98%', p_liq: '12,82%' },
        { ano: 2026, grupo: expenseGroups[3], aut: '0,09 mi', emp: '0,01 mi', liq: '0,01 mi', p_emp: '10,96%', p_liq: '10,96%' },
        { ano: 2026, grupo: expenseGroups[4], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2026, grupo: expenseGroups[5], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },

        { ano: 2025, grupo: expenseGroups[0], aut: '13,00 mi', emp: '12,63 mi', liq: '12,63 mi', p_emp: '97,14%', p_liq: '97,14%' },
        { ano: 2025, grupo: expenseGroups[1], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2025, grupo: expenseGroups[2], aut: '7,40 mi', emp: '6,98 mi', liq: '5,32 mi', p_emp: '94,38%', p_liq: '71,86%' },
        { ano: 2025, grupo: expenseGroups[3], aut: '0,40 mi', emp: '0,32 mi', liq: '0,07 mi', p_emp: '80,34%', p_liq: '18,12%' },
        { ano: 2025, grupo: expenseGroups[4], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2025, grupo: expenseGroups[5], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },

        { ano: 2026, grupo: expenseGroups[7], aut: '45,00 mi', emp: '42,00 mi', liq: '38,00 mi', p_emp: '93,33%', p_liq: '84,44%' },
        { ano: 2026, grupo: expenseGroups[8], aut: '12,00 mi', emp: '8,00 mi', liq: '6,00 mi', p_emp: '66,67%', p_liq: '50,00%' },

        { ano: 2025, grupo: expenseGroups[0], aut: '13,00 mi', emp: '12,63 mi', liq: '12,63 mi', p_emp: '97,14%', p_liq: '97,14%' },
        { ano: 2025, grupo: expenseGroups[1], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2025, grupo: expenseGroups[2], aut: '7,40 mi', emp: '6,98 mi', liq: '5,32 mi', p_emp: '94,38%', p_liq: '71,86%' },
        { ano: 2025, grupo: expenseGroups[3], aut: '0,40 mi', emp: '0,32 mi', liq: '0,07 mi', p_emp: '80,34%', p_liq: '18,12%' },
        { ano: 2025, grupo: expenseGroups[4], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2025, grupo: expenseGroups[5], aut: '0,00 mi', emp: '0,00 mi', liq: '0,00 mi', p_emp: '0,0%', p_liq: '0,0%' },
        { ano: 2025, grupo: expenseGroups[7], aut: '42,00 mi', emp: '41,50 mi', liq: '41,00 mi', p_emp: '98,81%', p_liq: '97,62%' },
        { ano: 2025, grupo: expenseGroups[8], aut: '10,00 mi', emp: '9,50 mi', liq: '9,20 mi', p_emp: '95,00%', p_liq: '92,00%' },

        // Dados de 2024
        { ano: 2024, grupo: expenseGroups[0], aut: '12,00 mi', emp: '11,04 mi', liq: '10,56 mi', p_emp: '92,00%', p_liq: '88,00%' },
        { ano: 2024, grupo: expenseGroups[1], aut: '1,50 mi', emp: '1,27 mi', liq: '1,20 mi', p_emp: '85,00%', p_liq: '80,00%' },
        { ano: 2024, grupo: expenseGroups[2], aut: '6,50 mi', emp: '5,85 mi', liq: '5,20 mi', p_emp: '90,00%', p_liq: '80,00%' },
        { ano: 2024, grupo: expenseGroups[3], aut: '0,35 mi', emp: '0,35 mi', liq: '0,33 mi', p_emp: '100,00%', p_liq: '95,00%' },
        { ano: 2024, grupo: expenseGroups[4], aut: '0,20 mi', emp: '0,15 mi', liq: '0,13 mi', p_emp: '75,00%', p_liq: '65,00%' },
        { ano: 2024, grupo: expenseGroups[5], aut: '1,00 mi', emp: '0,85 mi', liq: '0,80 mi', p_emp: '85,00%', p_liq: '80,00%' },
        { ano: 2024, grupo: expenseGroups[7], aut: '40,00 mi', emp: '39,00 mi', liq: '38,50 mi', p_emp: '97,50%', p_liq: '96,25%' },
        { ano: 2024, grupo: expenseGroups[8], aut: '9,00 mi', emp: '8,50 mi', liq: '8,00 mi', p_emp: '94,44%', p_liq: '88,89%' },

        // Dados de 2023
        { ano: 2023, grupo: expenseGroups[0], aut: '11,00 mi', emp: '9,68 mi', liq: '9,35 mi', p_emp: '88,00%', p_liq: '85,00%' },
        { ano: 2023, grupo: expenseGroups[1], aut: '1,30 mi', emp: '1,04 mi', liq: '1,01 mi', p_emp: '80,00%', p_liq: '78,00%' },
        { ano: 2023, grupo: expenseGroups[2], aut: '5,50 mi', emp: '4,67 mi', liq: '4,12 mi', p_emp: '85,00%', p_liq: '75,00%' },
        { ano: 2023, grupo: expenseGroups[3], aut: '0,30 mi', emp: '0,27 mi', liq: '0,25 mi', p_emp: '90,00%', p_liq: '85,00%' },
        { ano: 2023, grupo: expenseGroups[4], aut: '0,15 mi', emp: '0,10 mi', liq: '0,09 mi', p_emp: '65,00%', p_liq: '60,00%' },
        { ano: 2023, grupo: expenseGroups[5], aut: '0,80 mi', emp: '0,60 mi', liq: '0,56 mi', p_emp: '75,00%', p_liq: '70,00%' },
        { ano: 2023, grupo: expenseGroups[7], aut: '38,00 mi', emp: '37,00 mi', liq: '36,50 mi', p_emp: '97,37%', p_liq: '96,05%' },
        { ano: 2023, grupo: expenseGroups[8], aut: '8,00 mi', emp: '7,50 mi', liq: '7,00 mi', p_emp: '93,75%', p_liq: '87,50%' }
    ];

    const fmtB = (v) => "R$ " + (v / 1000000).toFixed(2) + " mi";
    const fmtFull = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    const fV = (v) => v.toFixed(2) + " mi";
    const popTab = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    // --- Shared Premium Tooltip ---
    const buildTooltip = (title, subtitle, series, w, dataPointIndex, isCurrency = true) => {
        let rowsHtml = '';
        series.forEach((sVal, i) => {
            const seriesName = w.globals.seriesNames[i];
            const color = w.config.colors[i];
            const val = sVal[dataPointIndex];
            let formattedVal = '';
            if (isCurrency) {
                formattedVal = fmtFull(val < 1000 ? val * 1e9 : val);
            } else {
                formattedVal = val.toFixed(1) + "%";
            }
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
        plotOptions: { bar: { borderRadius: 0, horizontal: false, distributed: true, dataLabels: { position: 'top', enabled: true, formatter: (val) => "R$ " + val.toLocaleString('pt-BR') } } },
        dataLabels: { enabled: true, style: { fontSize: '9px' }, offsetY: -20, formatter: (val) => "R$ " + val.toLocaleString('pt-BR') },
        xaxis: {
            categories: dispoData.categories,
            labels: { rotate: 0, trim: true, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: { show: true, labels: { formatter: (val) => "R$ " + (val / 1e6).toFixed(0) + "M" } },
        grid: { show: true, borderColor: '#f1f1f1' },
        legend: { show: true, position: 'bottom', markers: { radius: 4 } },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }) {
                const label = w.globals.labels[dataPointIndex];
                return buildTooltip(label, "Exercício 2026", series, w, dataPointIndex, true);
            }
        }
    }).render();

    function getSuccessChartOptions(selectedYears = ['2026']) {
        const groups = expenseGroups.filter(g => g.startsWith('1') || g.startsWith('3') || g.startsWith('4') || g.startsWith('R'));
        const series = [];
        const colors = ['#3b82f6', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

        groups.forEach((g, i) => {
            const shortName = g.split('-')[1].trim();
            const liqData = [];
            const empDiffData = [];

            selectedYears.forEach(year => {
                const item = sucessTableData.find(d => d.ano === parseInt(year) && d.grupo.includes(g.split(' ')[0]));
                const emp = item ? parseFloat(item.p_emp.toString().replace('%', '').replace(',', '.')) : 0;
                const liq = item ? parseFloat(item.p_liq.toString().replace('%', '').replace(',', '.')) : 0;

                // Agora usamos os percentuais diretos sobre o Autorizado
                const propLiq = liq;
                const propEmpDiff = Math.max(0, emp - liq);

                liqData.push(propLiq);
                empDiffData.push(propEmpDiff);
            });

            const colorKey = colors[i % colors.length];

            // 1. Parte Esquerda (Liquidado)
            series.push({
                name: `${shortName} (Liquidado)`,
                type: 'bar',
                stack: `stack_${i}`,
                data: liqData,
                itemStyle: { color: colorKey },
                showBackground: true,
                backgroundStyle: { color: 'rgba(230, 235, 240, 0.4)', borderRadius: [0, 4, 4, 0] },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 8,
                    color: '#fff',
                    formatter: (params) => params.value > 0 ? params.value.toFixed(1) + '%' : ''
                }
            });

            // 2. Parte Direita (Empenhado - Liquidado)
            series.push({
                name: `${shortName} (Empenhado)`,
                type: 'bar',
                stack: `stack_${i}`,
                data: empDiffData,
                itemStyle: { color: colorKey, opacity: 0.5 },
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
                    const yearName = selectedYears[yearIndex];
                    const groupSeriesName = params.seriesName.replace(' (Liquidado)', '').replace(' (Empenhado)', '');
                    const myStack = series.find(s => s.name === params.seriesName).stack;
                    const groupSeries = series.filter(s => s.stack === myStack);

                    const liqSeries = groupSeries.find(s => s.name.includes('(Liquidado)'));
                    const empDiffSeries = groupSeries.find(s => s.name.includes('(Empenhado)'));

                    const liqVal = liqSeries ? liqSeries.data[yearIndex] : 0;
                    const empDiffVal = empDiffSeries ? empDiffSeries.data[yearIndex] : 0;
                    const empTotal = liqVal + empDiffVal; // Valor total empenhado %
                    const color = liqSeries ? liqSeries.itemStyle.color : '#000';

                    let rowsHtml = '';
                    // Empenhado total (soma das partes do stack)
                    rowsHtml += `<div class="tooltip-row active" style="margin-bottom: 4px;"><span class="dot" style="background:${color}; opacity: 0.5;"></span><span class="label">Empenhado</span><span class="val" style="margin-left: 15px;">${empTotal.toFixed(1)}%</span></div>`;
                    // Liquidado (apenas a base do stack)
                    rowsHtml += `<div class="tooltip-row active"><span class="dot" style="background:${color}"></span><span class="label">Liquidado</span><span class="val" style="margin-left: 15px;">${liqVal.toFixed(1)}%</span></div>`;

                    return `
                        <div class="premium-tooltip" style="position:relative; z-index:9999;">
                            <div class="tooltip-header">
                                <div class="uo-info">${groupSeriesName}</div>
                                <div class="exercise-info">Exercício ${yearName}</div>
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
                type: 'value',
                max: 100,
                axisLabel: { fontSize: 8, formatter: '{value}%' },
                splitLine: { show: true, lineStyle: { type: 'dashed' } }
            },
            yAxis: {
                type: 'category',
                data: selectedYears,
                inverse: true,
                axisLabel: { fontSize: 12, fontWeight: 'bold' }
            },
            dataZoom: [
                { type: 'inside', yAxisIndex: 0 },
                {
                    type: 'slider', yAxisIndex: 0, right: '2%', width: 12,
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
    // 3. Comparativo Despesa (Ajustado para % para bater com imagem 2)
    const compData = [
        { g: expenseGroups[0], o25: 13.0, a25: 13.0, e25: 12.0, l25: 12.0, o26: 13.0, a26: 13.0, e26: 12.39, l26: 2.95, p_e26: 95.34, p_l26: 22.70 },
        { g: expenseGroups[1], o25: 0.0, a25: 0.0, e25: 0.0, l25: 0.0, o26: 0.0, a26: 0.0, e26: 0.0, l26: 0.0, p_e26: 0, p_l26: 0 },
        { g: expenseGroups[2], o25: 7.4, a25: 7.4, e25: 7.0, l25: 5.32, o26: 4.4, a26: 4.4, e26: 1.89, l26: 0.56, p_e26: 42.98, p_l26: 12.82 },
        { g: expenseGroups[3], o25: 0.4, a25: 0.4, e25: 0.32, l25: 0.07, o26: 0.09, a26: 0.09, e26: 0.01, l26: 0.01, p_e26: 10.96, p_l26: 10.96 }
    ];

    compData.sort((a, b) => b.p_e26 - a.p_e26);

    new ApexCharts(document.querySelector("#chart-comparativo"), {
        series: [
            { name: 'Empenhado/Autorizado (%)', data: compData.map(d => d.p_e26) },
            { name: 'Liquidado/Autorizado (%)', data: compData.map(d => d.p_l26) }
        ],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c'],
        plotOptions: { bar: { borderRadius: 0, columnWidth: '70%', dataLabels: { position: 'top' } } },
        dataLabels: { enabled: true, style: { fontSize: '8px' }, formatter: (v) => v > 0 ? v + '%' : '' },
        xaxis: {
            categories: compData.map(d => d.g),
            labels: { rotate: 0, trim: true, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: {
            show: true,
            labels: { style: { fontSize: '9px' }, formatter: (val) => val + "%" }
        },
        grid: { show: true, borderColor: '#f1f1f1', strokeDashArray: 4 },
        legend: { position: 'bottom', horizontalAlign: 'center', offsetY: 0, markers: { radius: 4 } },
        tooltip: {
            custom: function ({ series, dataPointIndex, w }) {
                const group = compData[dataPointIndex].g;
                return buildTooltip(group, "Eficiência de Planejamento 2026", series, w, dataPointIndex, false);
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

    const fM = (v) => (v / 1000000).toFixed(1) + " mi";
    const fB = (v) => (v / 1000000).toFixed(2) + " mi";
    const getF = (v) => fM(v);

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

        const pS = (v) => parseFloat(v.toString().replace(' mi', '').replace(/\./g, '').replace(',', '.'));
        const pFull = (v) => fmtFull(pS(v) * 1e6);

        // calculate totals per year
        let totals = {};
        sortedYears.forEach(y => { totals[y] = { a: 0, e: 0, l: 0 }; });

        expenseGroups.slice(0, 6).forEach(g => {
            sortedYears.forEach(y => {
                const item = sucessTableData.find(d => d.ano === parseInt(y) && d.grupo === g);
                if (item) {
                    totals[y].a += pS(item.aut || 0);
                    totals[y].e += pS(item.emp || 0);
                    totals[y].l += pS(item.liq || 0);
                }
            });
        });

        let tbodyHtml = `<tr class="row-total"><td title="Valores Totais">TOTAL</td>`;
        sortedYears.forEach(y => {
            const t = totals[y];
            tbodyHtml += `
                <td title="${fmtFull(t.a * 1e6)}">${t.a.toFixed(2).replace('.', ',')} mi</td>
                <td title="${fmtFull(t.e * 1e6)}">${t.e.toFixed(2).replace('.', ',')} mi</td>
                <td title="${fmtFull(t.l * 1e6)}">${t.l.toFixed(2).replace('.', ',')} mi</td>
                <td title="Eficiência Empenho: ${((t.e / t.a) * 100).toFixed(1)}%">${((t.e / t.a) * 100).toFixed(1).replace('.', ',')}%</td>
                <td title="Eficiência Liquidação: ${((t.l / t.a) * 100).toFixed(1)}%">${((t.l / t.a) * 100).toFixed(1).replace('.', ',')}%</td>
            `;
        });
        tbodyHtml += `</tr>`;

        expenseGroups.slice(0, 6).forEach(g => {
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
        const val = dispoData.values[i];
        return `<tr><td style="text-align:left;" title="${cat}">${cat}</td><td class="text-end fw-bold" title="${fmtFull(val)}">${fmtFull(val)}</td></tr>`;
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

    function updateTopCards(selectedYears = ['2026']) {
        const sorted = [...selectedYears].sort((a, b) => b - a);
        const latestYear = sorted[0] || '2026';
        const prevYear = (parseInt(latestYear) - 1).toString();
        const suffix = latestYear.slice(-2);
        const prevSuffix = prevYear.slice(-2);

        // 1. Autorizado Total (Latest)
        let totalAut = 0, totalLiq = 0, totalPrevLiq = 0;
        poDataDetailed.forEach(d => {
            totalAut += (d['a' + suffix] || 0);
            totalLiq += (d['l' + suffix] || 0);
            totalPrevLiq += (d['l' + prevSuffix] || 0);
        });

        document.getElementById('top-card-autorizado').innerText = (totalAut / 1e6).toFixed(2).replace('.', ',') + " mi";

        // 2. Disponível sem Reserva (Calculado como % do Autorizado para fazer sentido no dashboard)
        const dispoVal = dispoData.values[1];
        const dispoPerc = totalAut > 0 ? (dispoVal / totalAut) * 100 : 0;
        document.getElementById('top-card-dispo').innerText = dispoPerc.toFixed(2).replace('.', ',') + " %";

        // 3. Sucesso do Planejamento Orçamentário (% Liq / Aut)
        const sucessoPerc = totalAut > 0 ? (totalLiq / totalAut) * 100 : 0;
        document.getElementById('top-card-sucesso').innerText = sucessoPerc.toFixed(2).replace('.', ',') + " %";

        // 4. Comparativo (% Var Liq vs Prev Year)
        const compVar = totalPrevLiq > 0 ? ((totalLiq - totalPrevLiq) / totalPrevLiq) * 100 : 0;
        const compEl = document.getElementById('top-card-comparativo');
        compEl.innerText = (compVar >= 0 ? '+' : '') + compVar.toFixed(2).replace('.', ',') + " %";
        compEl.className = 'value ' + (compVar >= 0 ? 'variation-up' : 'variation-down');

        // 5. PO de Maior liquidação
        let topPO = { po: '-', val: 0 };
        poDataDetailed.forEach(d => {
            const val = d['l' + suffix] || 0;
            if (val > topPO.val) {
                topPO = { po: d.po, val: val };
            }
        });
        document.getElementById('top-card-po-valor').innerText = "R$ " + (topPO.val / 1e6).toFixed(2).replace('.', ',') + " mi";
        document.getElementById('top-card-po-nome').innerText = topPO.po;
        document.getElementById('top-card-po-nome').title = topPO.po;
    }

    document.getElementById('btn-filtrar')?.addEventListener('click', function () {
        updateChips();
        const selectedYears = Array.from(filterRefs.ano.selectedOptions).map(opt => opt.value).filter(v => v !== '');
        const yearsToUse = selectedYears.length > 0 ? selectedYears : ['2026'];

        if (successChart) successChart.setOption(getSuccessChartOptions(yearsToUse));
        renderSucessoTable(yearsToUse);
        updateTopCards(yearsToUse); // Update indicators
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
        updateTopCards(['2026']); // Reset indicators
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
    updateTopCards(['2025', '2026']); // Initial call
});
