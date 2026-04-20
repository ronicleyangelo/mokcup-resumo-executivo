document.addEventListener('DOMContentLoaded', function () {
    // --- Mock Data ---
    const dispoData = {
        categories: ['Disponível', 'Disponível sem Reserva', 'Disponível com Reserva', 'Empenhado a Liquidar'],
        values: [3.0, 1.5, 1.5, 10.7] // Valores Baseados no total 2026: Aut 17 - Emp 14 = 3 mi | Emp 14 - Liq 3.5 = 10.5 mi
    };

    const expenseGroups = [
        '1 - PESSOAL E ENCARGOS SOCIAIS', '2 - JUROS E ENCARGOS DA DÍVIDA', '3 - OUTRAS DESPESAS CORRENTES',
        '4 - INVESTIMENTOS', '5 - INVERSÕES FINANCEIRAS', '6 - AMORTIZAÇÃO DA DÍVIDA', '9 - RESERVA DE CONTINGÊNCIA',
        'R1 - RECEITAS CORRENTES', 'R2 - RECEITAS DE CAPITAL'
    ];

    const poDataDetailed = [
        { po: '000001 - Não Definido', l24: 11771630, o25: 13000000, a25: 14000000, e25: 14000000, l25: 14000000, o26: 13000000, a26: 13000000, e26: 12000000, l26: 2972200 },
        { po: '003339 - REFORMA E ADEQUAÇÃO DA NOVA SEDE DA SEP', l24: 0, o25: 0, a25: 2200000, e25: 2200000, l25: 844000, o26: 0, a26: 449000, e26: 0, l26: 0 },
        { po: '002778 - CONTRATAÇÃO DE SERVIÇOS DE APOIO DE TI', l24: 539840, o25: 436000, a25: 890000, e25: 778000, l25: 708000, o26: 579000, a26: 579000, e26: 492000, l26: 140680 },
        { po: '001676 - ADMINISTRAÇÃO DA UNIDADE', l24: 1174000, o25: 1100000, a25: 986000, e25: 827000, l25: 690000, o26: 1200000, a26: 1100000, e26: 439000, l26: 103362 },
        { po: '000002 - Despesa Obrigatória', l24: 594000, o25: 632000, a25: 718000, e25: 674000, l25: 674000, o26: 749000, a26: 749000, e26: 214000, l26: 173555 },
        { po: '003213 - CONTRATOS DE MÃO DE OBRA - SEGER', l24: 0, o25: 326000, a25: 632000, e25: 632000, l25: 561000, o26: 650000, a26: 699000, e26: 699000, l26: 110864 },
        { po: '001364 - Audiências Públicas', l24: 194932, o25: 260000, a25: 181000, e25: 180000, l25: 180000, o26: 437000, a26: 486000, e26: 0, l26: 0 },
        { po: '003193 - PROJETO ESTADO PRESENTE: PESQUISADOR E AVALIADOR', l24: 218000, o25: 109000, a25: 109000, e25: 109000, l25: 109000, o26: 0, a26: 0, e26: 0, l26: 0 },
        { po: '001580 - DESENVOLVIMIENTO DE AÇÕES DE CIÊNCIA, TECNOLOGIA E INOVAÇÃO', l24: 0, o25: 48000, a25: 42000, e25: 42000, l25: 42000, o26: 132000, a26: 132000, e26: 11134, l26: 11134 },
        { po: '001894 - CAPACITAÇÕES DOS GERENTES DE PROJETOS', l24: 24465, o25: 30000, a25: 30000, e25: 12000, l25: 12000, o26: 30000, a26: 30000, e26: 0, l26: 0 },
        { po: '001709 - CAPACITAÇÃO EM GESTÃO ESTRATÉGICA', l24: 0, o25: 25000, a25: 25000, e25: 0, l25: 0, o26: 30000, a26: 30000, e26: 0, l26: 0 },
        { po: '002611 - AQUISIÇÃO DE EQUIPAMENTOS E MATERIAIS DE TI', l24: 350000, o25: 0, a25: 191000, e25: 164000, l25: 0, o26: 0, a26: 0, e26: 0, l26: 0 },
        { po: '002921 - AQUISIÇÃO DE MOBILIÁRIOS DIVERSOS E DIVISÓRIAS', l24: 358696, o25: 0, a25: 34000, e25: 16000, l25: 0, o26: 0, a26: 12000, e26: 10450, l26: 10450 },
        { po: '002922 - AQUISIÇÃO DE APARELHOS DE AR-CONDICIONADO', l24: 0, o25: 0, a25: 80000, e25: 60000, l25: 0, o26: 0, a26: 0, e26: 0, l26: 0 }
    ];

    const poList = [...poDataDetailed].sort((a, b) => b.l26 - a.l26);

    // Lista filtrada para o gráfico: top 5 POs (incluindo SEP)
    const sepPO = poDataDetailed.find(p => p.po.includes('003339'));
    const poChartList = [...poDataDetailed]
        .sort((a, b) => b.o26 - a.o26)
        .filter(p => !p.po.includes('003339'))
        .slice(0, 4);
    if (sepPO) poChartList.push(sepPO);
    poChartList.sort((a, b) => a.o26 - b.o26);

    // Grupos de despesa para SEP (apenas 1, 3, 4)
    const sepExpenseGroups = [
        '1 - PESSOAL E ENCARGOS SOCIAIS',
        '3 - OUTRAS DESPESAS CORRENTES',
        '4 - INVESTIMENTOS'
    ];

    const sucessTableData = [
        // 2023
        { ano: 2023, grupo: '1 - PESSOAL E ENCARGOS SOCIAIS', aut: 11000000, emp: 10800000, liq: 10800000, p_emp: '98,18%', p_liq: '98,18%' },
        { ano: 2023, grupo: '3 - OUTRAS DESPESAS CORRENTES', aut: 5500000, emp: 5200000, liq: 4500000, p_emp: '94,55%', p_liq: '81,82%' },
        { ano: 2023, grupo: '4 - INVESTIMENTOS', aut: 1200000, emp: 900000, liq: 850000, p_emp: '75,00%', p_liq: '70,83%' },
        // 2024
        { ano: 2024, grupo: '1 - PESSOAL E ENCARGOS SOCIAIS', aut: 12200000, emp: 12000000, liq: 11900000, p_emp: '98,36%', p_liq: '97,54%' },
        { ano: 2024, grupo: '3 - OUTRAS DESPESAS CORRENTES', aut: 6500000, emp: 6100000, liq: 5500000, p_emp: '93,85%', p_liq: '84,62%' },
        { ano: 2024, grupo: '4 - INVESTIMENTOS', aut: 800000, emp: 750000, liq: 600000, p_emp: '93,75%', p_liq: '75,00%' },
        // 2025
        { ano: 2025, grupo: '1 - PESSOAL E ENCARGOS SOCIAIS', aut: 12800000, emp: 12500000, liq: 12500000, p_emp: '97,66%', p_liq: '97,66%' },
        { ano: 2025, grupo: '3 - OUTRAS DESPESAS CORRENTES', aut: 7200000, emp: 6800000, liq: 5100000, p_emp: '94,44%', p_liq: '70,83%' },
        { ano: 2025, grupo: '4 - INVESTIMENTOS', aut: 450000, emp: 380000, liq: 120000, p_emp: '84,44%', p_liq: '26,67%' },
        // 2026
        { ano: 2026, grupo: '1 - PESSOAL E ENCARGOS SOCIAIS', aut: 13000000, emp: 12000000, liq: 2900000, p_emp: '92,31%', p_liq: '22,31%' },
        { ano: 2026, grupo: '3 - OUTRAS DESPESAS CORRENTES', aut: 4400000, emp: 1900000, liq: 565000, p_emp: '43,18%', p_liq: '12,84%' },
        { ano: 2026, grupo: '4 - INVESTIMENTOS', aut: 92000, emp: 10000, liq: 10000, p_emp: '10,87%', p_liq: '10,87%' }
    ];


    const fmtB = (v) => {
        if (v === 0) return 'R$ 0';
        const absV = Math.abs(v);
        if (absV >= 1000000) {
            return 'R$ ' + (v / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + ' mi';
        }
        if (absV >= 1000) {
            return 'R$ ' + (v / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' mil';
        }
        return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
    };
    const fB = (v) => fmtB(v);
    const getF = (v) => fmtB(v);
    const fmtFull = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
    const popTab = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    // --- Shared Premium Tooltip ---
    const buildTooltip = (title, subtitle, series, w, dataPointIndex, seriesIndex = null) => {
        let rowsHtml = '';
        const seriesToUse = seriesIndex !== null ? [series[seriesIndex]] : series;
        const seriesNamesToUse = seriesIndex !== null ? [w.globals.seriesNames[seriesIndex]] : w.globals.seriesNames;
        const colorsToUse = seriesIndex !== null ? [w.config.colors[seriesIndex]] : w.config.colors;

        seriesToUse.forEach((sVal, i) => {
            const seriesName = seriesNamesToUse[i];
            const color = colorsToUse[i];
            const val = sVal[dataPointIndex];
            const isPct = val < 100.1;
            const formattedVal = isPct ? (val.toFixed(1) + "%") : fmtFull(val * 1e9);
            rowsHtml += `<div class="tooltip-row active"><span class="dot" style="background:${color}"></span><span class="label">${seriesName}</span><span class="val" style="margin-left:15px;">${formattedVal}</span></div>`;
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
        dataLabels: {
            enabled: true,
            formatter: (val) => fmtFull(val * 1e6),
            style: { fontSize: '9px', fontWeight: 700, colors: ['#334155'] },
            offsetY: -22
        },
        xaxis: {
            categories: dispoData.categories,
            labels: { rotate: 0, trim: true, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: {
            show: true,
            labels: {
                formatter: (val) => 'R$ ' + (val * 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
        },
        grid: { show: true, borderColor: '#f1f1f1' },
        legend: { show: true, position: 'bottom', markers: { shape: 'circle', radius: 12 } },
        tooltip: {
            shared: false,
            custom: function ({ dataPointIndex }) {
                const vals = dispoData.values;
                const fmt = (v) => 'R$ ' + (v * 1e6).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                return `<div class="premium-tooltip">
                    <div class="tooltip-header">
                        <div class="uo-info">UO: 27101 - SEP</div>
                        <div class="exercise-info">Exercício: 2026</div>
                    </div>
                    <div class="tooltip-body">
                        <div class="tooltip-row active"><span class="label">Disponível:</span><span class="val">${fmt(vals[0])}</span></div>
                        <div class="tooltip-row active"><span class="label">Disponível sem Reserva:</span><span class="val">${fmt(vals[1])}</span></div>
                        <div class="tooltip-row active"><span class="label">Disponível com Reserva:</span><span class="val">${fmt(vals[2])}</span></div>
                        <div class="tooltip-row active"><span class="label">Empenhado a Liquidar:</span><span class="val">${fmt(vals[3])}</span></div>
                    </div>
                </div>`;
            }
        }
    }).render();

    function getSuccessChartOptions(selectedYears = ['2026']) {
        // Obter grupos despesa + receitas (R)
        const groups = expenseGroups.filter(g => g.startsWith('1') || g.startsWith('3') || g.startsWith('4') || g.startsWith('R'));
        
        const series = [];
        const colors = ['#3b82f6', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

        groups.forEach((g, i) => {
            const shortName = g.split('-')[1].trim();
            const liqData = [];
            const empDiffData = [];

            selectedYears.forEach(year => {
                // Tenta extrair o código numérico/R do grupo
                const code = g.split(' ')[0];
                const item = sucessTableData.find(d => d.ano === parseInt(year) && d.grupo.startsWith(code));
                
                const empStr = item ? (item.p_emp || '0%').toString() : '0%';
                const liqStr = item ? (item.p_liq || '0%').toString() : '0%';
                
                const emp = parseFloat(empStr.replace(',', '.').replace('%', ''));
                const liq = parseFloat(liqStr.replace(',', '.').replace('%', ''));

                liqData.push(liq);
                empDiffData.push(Math.max(0, emp - liq));
            });

            const colorKey = colors[i % colors.length];

            // 1. Liquidado
            series.push({
                name: `${shortName} (Liquidado)`,
                type: 'bar',
                stack: `stack_${i}`,
                data: liqData,
                itemStyle: { color: colorKey },
                label: {
                    show: true,
                    position: 'inside',
                    fontSize: 8,
                    color: '#fff',
                    formatter: (p) => p.value > 0 ? p.value.toFixed(1).replace('.', ',') + '%' : ''
                }
            });

            // 2. Empenhado (Saldo)
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
                    formatter: (p) => p.value > 0 ? p.value.toFixed(1).replace('.', ',') + '%' : ''
                }
            });
        });

        return {
            legend: { 
                bottom: '0%', 
                type: 'scroll', 
                icon: 'circle',
                textStyle: { fontSize: 10 },
                pageTextStyle: { fontSize: 9 }
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                formatter: function (params) {
                    const yearIndex = params.dataIndex;
                    const yearName = selectedYears[yearIndex];
                    const fullSeriesName = params.seriesName;
                    const groupName = fullSeriesName.replace(' (Liquidado)', '').replace(' (Empenhado)', '');
                    
                    // Encontrar dados para o tooltip (Soma a parte stackada)
                    const myStack = series.find(s => s.name === fullSeriesName).stack;
                    const parts = series.filter(s => s.stack === myStack);
                    const liqVal = parts.find(p => p.name.includes('(Liquidado)')).data[yearIndex];
                    const empDiffVal = parts.find(p => p.name.includes('(Empenhado)')).data[yearIndex];
                    const totalEmp = liqVal + empDiffVal;
                    const color = parts.find(p => p.name.includes('(Liquidado)')).itemStyle.color;

                    return `
                        <div class="premium-tooltip">
                            <div class="tooltip-header">
                                <div class="uo-info">${groupName}</div>
                                <div class="exercise-info">Exercício ${yearName}</div>
                            </div>
                            <div class="tooltip-body">
                                <p style="margin:2px 0"><span style="display:inline-block;width:10px;height:10px;background:${color};border-radius:50%;margin-right:5px"></span><b>Liquidado:</b> ${liqVal.toFixed(1).replace('.', ',')}%</p>
                                <p style="margin:2px 0"><span style="display:inline-block;width:10px;height:10px;background:${color};opacity:0.5;border-radius:50%;margin-right:5px"></span><b>Empenhado:</b> ${totalEmp.toFixed(1).replace('.', ',')}%</p>
                            </div>
                        </div>
                    `;
                }
            },
            grid: { bottom: '15%', top: '10%', left: '3%', right: '5%', containLabel: true },
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

    // 3. Comparativo Despesa — SEP (grupos 1, 3, 4)
    const compData = [
        {
            g: '1 - PESSOAL E ENCARGOS SOCIAIS',
            l24: 11582997,
            o25: 12700371, a25: 12700371, e25: 12337050, l25: 12337050,
            o26: 12919749, a26: 12919749, e26: 12317900, l26: 2932617
        },
        {
            g: '3 - OUTRAS DESPESAS CORRENTES',
            l24: 2859809,
            o25: 3130541, a25: 7432541, e25: 7015040, l25: 5340694,
            o26: 3958370, a26: 4407267, e26: 1894410, l26: 564859
        },
        {
            g: '4 - INVESTIMENTOS',
            l24: 723407,
            o25: 100000, a25: 404428, e25: 324923.45, l25: 73281.15,
            o26: 92000, a26: 92000, e26: 10082.70, l26: 10082.70
        }
    ];

    const fmtBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

    new ApexCharts(document.querySelector("#chart-comparativo"), {
        series: [
            { name: '2025', data: compData.map(d => d.l25) },
            { name: '2026', data: compData.map(d => d.l26) }
        ],
        chart: { type: 'bar', height: '100%', toolbar: { show: false } },
        colors: ['#56c0d8', '#ef8b9c'],
        plotOptions: { bar: { borderRadius: 0, columnWidth: '70%', dataLabels: { position: 'top' } } },
        dataLabels: {
            enabled: true,
            formatter: (v) => fmtFull(v),
            style: { fontSize: '8px', fontWeight: 700, colors: ['#334155'] },
            offsetY: -18
        },
        xaxis: {
            categories: compData.map(d => d.g),
            labels: { rotate: 0, trim: true, style: { fontSize: '9px', fontWeight: 600 } }
        },
        yaxis: {
            show: true,
            labels: {
                style: { fontSize: '9px' },
                formatter: (val) => fmtBRL(val)
            }
        },
        grid: { show: true, borderColor: '#f1f1f1', strokeDashArray: 4 },
        legend: { position: 'bottom', horizontalAlign: 'center', offsetY: 0, markers: { shape: 'circle', radius: 12 } },
        tooltip: {
            shared: false,
            custom: function ({ seriesIndex, dataPointIndex }) {
                const d = compData[dataPointIndex];
                const ano = seriesIndex === 0 ? '2025' : '2026';
                const l = seriesIndex === 0 ? d.l25 : d.l26;
                return `<div class="premium-tooltip">
                    <div class="tooltip-header">
                        <div class="uo-info">${d.g}</div>
                        <div class="exercise-info">Exercício ${ano}</div>
                    </div>
                    <div class="tooltip-body">
                        <div class="tooltip-row active">
                            <span class="label">Liquidado:</span>
                            <span class="val">${fmtFull(l)}</span>
                        </div>
                    </div>
                </div>`;
            }
        }
    }).render();


    // 4. Plano Orçamentário — ECharts com Scroll Vertical Nativo (Interno)
    const poChartDom = document.querySelector("#chart-po");
    if (poChartDom && typeof echarts !== 'undefined') {
        const poChart = echarts.init(poChartDom);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: function (params) {
                    const poName = params[0].name;
                    let rowsHtml = '';
                    params.forEach(p => {
                        rowsHtml += `<div class="tooltip-row active">
                            <span class="label">${p.seriesName}:</span>
                            <span class="val">${fmtFull(p.value)}</span>
                        </div>`;
                    });
                    return `<div class="premium-tooltip">
                        <div class="tooltip-header">
                            <div class="uo-info">${poName}</div>
                            <div class="exercise-info">Exercício: 2026</div>
                        </div>
                        <div class="tooltip-body">
                            ${rowsHtml}
                        </div>
                    </div>`;
                }
            },
            legend: { bottom: 0, icon: 'circle', textStyle: { fontSize: 10 } },
            grid: { top: '5%', left: '3%', right: '15%', bottom: '12%', containLabel: true },
            dataZoom: [],
            xAxis: {
                type: 'value',
                axisLabel: {
                    fontSize: 9,
                    formatter: (v) => {
                        if (v === 0) return 'R$ 0';
                        if (Math.abs(v) >= 1000000) return 'R$ ' + (v / 1000000).toFixed(0).replace('.', ',') + ' mi';
                        if (Math.abs(v) >= 1000) return 'R$ ' + (v / 1000).toFixed(0) + ' mil';
                        return 'R$ ' + v;
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: poChartList.map(p => p.po),
                axisLabel: {
                    interval: 0,
                    fontSize: 9,
                    formatter: (v) => v.length > 25 ? v.substring(0, 25) + '...' : v
                }
            },
            series: [
                {
                    name: 'Orçado', type: 'bar', itemStyle: { color: '#cbd5e1' },
                    label: { show: false },
                    data: poChartList.map(p => p.o26)
                },
                {
                    name: 'Autorizado', type: 'bar', itemStyle: { color: '#56c0d8' },
                    label: { show: false },
                    data: poChartList.map(p => p.a26)
                },
                {
                    name: 'Empenhado', type: 'bar', itemStyle: { color: '#a372c4' },
                    label: { show: false },
                    data: poChartList.map(p => p.e26)
                },
                {
                    name: 'Liquidado', type: 'bar', itemStyle: { color: '#1e3a8a' },
                    label: { show: false },
                    data: poChartList.map(p => p.l26)
                }
            ]
        };
        poChart.setOption(option);
        window.addEventListener('resize', () => poChart.resize());
    }

    // --- Tables ---

    // A. Plano Orçamentário Table
    let tablePoHtml = '';
    let t_l24 = 0, t_o25 = 0, t_a25 = 0, t_e25 = 0, t_l25 = 0, t_o26 = 0, t_a26 = 0, t_e26 = 0, t_l26 = 0;
    poDataDetailed.forEach(d => {
        t_l24 += d.l24; t_o25 += d.o25; t_a25 += d.a25; t_e25 += d.e25; t_l25 += d.l25;
        t_o26 += d.o26; t_a26 += d.a26; t_e26 += d.e26; t_l26 += d.l26;
    });

    const calcVar = (curr, prev) => {
        if (!prev || prev === 0) return '';
        return (((curr - prev) / prev) * 100).toFixed(2).replace('.', ',').replace('-', '-');
    };
    const v25T = calcVar(t_l25, t_l24);
    const v26T = calcVar(t_l26, t_l25);

    // Total First
    tablePoHtml += `<tr class="row-total">
        <td title="Valor Total Acumulado">TOTAL</td>
        <td title="${fmtFull(t_o25)}">${fB(t_o25)}</td>
        <td title="${fmtFull(t_a25)}">${fB(t_a25)}</td>
        <td title="${fmtFull(t_e25)}">${fB(t_e25)}</td>
        <td title="${fmtFull(t_l25)}">${fB(t_l25)}</td>
        <td title="Variação Percentual: ${v25T}">${v25T ? v25T + '%' : ''}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_o26)}">${fB(t_o26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_a26)}">${fB(t_a26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_e26)}">${fB(t_e26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="${fmtFull(t_l26)}">${fB(t_l26)}</td>
        <td style="background:rgba(30,58,138,0.05);" title="Variação Percentual: ${v26T}">${v26T ? v26T + '%' : ''}</td>
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
            <td style="font-weight:bold;" title="Variação: ${v25}">${v25 ? v25 + '%' : ''}</td>
            <td style="font-size:9px;" title="${fmtFull(d.o26)}">${getF(d.o26)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.a26)}">${getF(d.a26)}</td>
            <td style="font-size:9px;" title="${fmtFull(d.e26)}">${getF(d.e26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05); font-weight:bold; color:#1e3a8a;" title="${fmtFull(d.l26)}">${getF(d.l26)}</td>
            <td style="font-weight:bold; background:rgba(30,58,138,0.05);" title="Variação: ${v26}">${v26 ? v26 + '%' : ''}</td>
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



        // calculate totals per year
        let totals = {};
        sortedYears.forEach(y => { totals[y] = { a: 0, e: 0, l: 0 }; });

        sepExpenseGroups.forEach(g => {
            sortedYears.forEach(y => {
                const item = sucessTableData.find(d => d.ano === parseInt(y) && d.grupo === g);
                if (item) {
                    totals[y].a += item.aut || 0;
                    totals[y].e += item.emp || 0;
                    totals[y].l += item.liq || 0;
                }
            });
        });

        let tbodyHtml = `<tr class="row-total"><td title="Valores Totais">TOTAL</td>`;
        sortedYears.forEach(y => {
            const t = totals[y];
            tbodyHtml += `
                <td title="${fmtFull(t.a)}">${fB(t.a)}</td>
                <td title="${fmtFull(t.e)}">${fB(t.e)}</td>
                <td title="${fmtFull(t.l)}">${fB(t.l)}</td>
                <td title="Eficiência Empenho: ${((t.e / t.a) * 100).toFixed(1)}%">${((t.e / t.a) * 100).toFixed(1).replace('.', ',')}%</td>
                <td title="Eficiência Liquidação: ${((t.l / t.a) * 100).toFixed(1)}%">${((t.l / t.a) * 100).toFixed(1).replace('.', ',')}%</td>
            `;
        });
        tbodyHtml += `</tr>`;

        sepExpenseGroups.forEach(g => {
            tbodyHtml += `<tr><td style="text-align:left; font-weight:600;" title="${g}">${g}</td>`;
            sortedYears.forEach(y => {
                const item = sucessTableData.find(d => d.ano === parseInt(y) && d.grupo === g);
                if (item) {
                    tbodyHtml += `
                        <td style="font-size:9px;" title="${fmtFull(item.aut)}">${fB(item.aut)}</td>
                        <td style="font-size:9px;" title="${fmtFull(item.emp)}">${fB(item.emp)}</td>
                        <td style="font-size:9px;" title="${fmtFull(item.liq)}">${fB(item.liq)}</td>
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

    renderSucessoTable(['2023', '2024', '2025', '2026']); // Render inicial

    // C. Comparativo Despesa Table — 5 colunas por ano
    let compHtml = '';
    let tcL24 = 0, tcL25 = 0, tcA25 = 0, tcE25 = 0, tcO25 = 0;
    let tcL26 = 0, tcA26 = 0, tcE26 = 0, tcO26 = 0;

    compData.forEach(d => {
        tcL24 += d.l24;
        tcO25 += d.o25; tcA25 += d.a25; tcE25 += d.e25; tcL25 += d.l25;
        tcO26 += d.o26; tcA26 += d.a26; tcE26 += d.e26; tcL26 += d.l26;
    });

    const v25TC = calcVar(tcL25, tcL24);
    const v26TC = calcVar(tcL26, tcL25);

    const getVarStyle = (v) => {
        return 'font-weight: bold; color: #334155;'; // Estilo neutro (sem cores)
    };

    compHtml += `<tr class="row-total">
        <td>TOTAL</td>
        <td>${fB(tcO25)}</td>
        <td>${fB(tcA25)}</td>
        <td>${fB(tcE25)}</td>
        <td>${fB(tcL25)}</td>
        <td style="${getVarStyle(v25TC)}">${v25TC ? v25TC + '%' : ''}</td>
        <td style="background:rgba(30,58,138,0.05);">${fB(tcO26)}</td>
        <td style="background:rgba(30,58,138,0.05);">${fB(tcA26)}</td>
        <td style="background:rgba(30,58,138,0.05);">${fB(tcE26)}</td>
        <td style="background:rgba(30,58,138,0.05); color:#1e3a8a; font-weight:bold;">${fB(tcL26)}</td>
        <td style="${getVarStyle(v26TC)}">${v26TC ? v26TC + '%' : ''}</td>
    </tr>`;

    compData.forEach(d => {
        const v25 = calcVar(d.l25, d.l24);
        const v26 = calcVar(d.l26, d.l25);
        compHtml += `<tr>
            <td style="text-align:left; font-weight:600;" title="${d.g}">${d.g}</td>
            <td style="font-size:9px;">${fB(d.o25)}</td>
            <td style="font-size:9px;">${fB(d.a25)}</td>
            <td style="font-size:9px;">${fB(d.e25)}</td>
            <td style="font-size:9px; background:#f8fafc; font-weight:bold;">${fB(d.l25)}</td>
            <td style="font-size:9px; ${getVarStyle(v25)}">${v25 ? v25 + '%' : ''}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05);">${fB(d.o26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05);">${fB(d.a26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05);">${fB(d.e26)}</td>
            <td style="font-size:9px; background:rgba(30,58,138,0.05); font-weight:bold; color:#1e3a8a;">${fB(d.l26)}</td>
            <td style="font-size:9px; ${getVarStyle(v26)}">${v26 ? v26 + '%' : ''}</td>
        </tr>`;
    });
    popTab('table-despesa-comparativo', compHtml);



    // D. Disponibilidade Table
    popTab('table-dispo', dispoData.categories.map((cat, i) => {
        const val = dispoData.values[i];
        const vNominal = val * 1e6;
        return `<tr><td style="text-align:left;" title="${cat}">${cat}</td><td class="text-end fw-bold" title="${fmtFull(vNominal)}">${fmtB(vNominal)}</td></tr>`;
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

    // --- Mock de dados por ano e UO ---
    const budgetByYearUO = {
        '2026': {
            '27101 - SEP': { disponivel: 1.5, autorizado: 16.8, liquidado: 3.3432 },
            '2601 - SEC. EDUCAÇÃO': { disponivel: 18.5, autorizado: 32.8, liquidado: 16.9 },
            '2301 - SEC. SAÚDE': { disponivel: 12.3, autorizado: 28.6, liquidado: 14.1 },
            '2401 - SEC. SEGURANÇA': { disponivel: 8.7, autorizado: 18.4, liquidado: 9.2 },
            '__all__': { disponivel: 1.5, autorizado: 110.5, liquidado: 3.3432 }
        },
        '2025': {
            '27101 - SEP': { disponivel: 24.5, autorizado: 45.0, liquidado: 16.92 },
            '2601 - SEC. EDUCAÇÃO': { disponivel: 15.0, autorizado: 28.5, liquidado: 13.5 },
            '2301 - SEC. SAÚDE': { disponivel: 11.2, autorizado: 25.0, liquidado: 11.8 },
            '2401 - SEC. SEGURANÇA': { disponivel: 6.9, autorizado: 15.5, liquidado: 7.8 },
            '__all__': { disponivel: 57.6, autorizado: 114.0, liquidado: 51.3 }
        },
        '2024': {
            '27101 - SEP': { disponivel: 19.8, autorizado: 38.5, liquidado: 16.5 },
            '2601 - SEC. EDUCAÇÃO': { disponivel: 13.5, autorizado: 27.0, liquidado: 12.8 },
            '2301 - SEC. SAÚDE': { disponivel: 8.9, autorizado: 23.5, liquidado: 10.2 },
            '2401 - SEC. SEGURANÇA': { disponivel: 6.2, autorizado: 14.8, liquidado: 6.9 },
            '__all__': { disponivel: 48.4, autorizado: 103.8, liquidado: 46.4 }
        },
        '2023': {
            '27101 - SEP': { disponivel: 18.2, autorizado: 35.0, liquidado: 15.8 },
            '2601 - SEC. EDUCAÇÃO': { disponivel: 12.8, autorizado: 25.5, liquidado: 11.9 },
            '2301 - SEC. SAÚDE': { disponivel: 7.5, autorizado: 21.0, liquidado: 9.5 },
            '2401 - SEC. SEGURANÇA': { disponivel: 5.8, autorizado: 13.5, liquidado: 6.2 },
            '__all__': { disponivel: 44.3, autorizado: 95.0, liquidado: 43.4 }
        }
    };

    // PO líder por ano e UO
    const topPOByYearUO = {
        '2026': {
            '27101 - SEP': { nome: '003339 - REFORMA SEP', valor: 844000 },
            '2601 - SEC. EDUCAÇÃO': { nome: '000002 - D. OBRIG.', valor: 14.8 },
            '2301 - SEC. SAÚDE': { nome: '000002 - D. OBRIG.', valor: 10.2 },
            '2401 - SEC. SEGURANÇA': { nome: '003055 - POL. PREV.', valor: 5.8 },
            '__all__': { nome: '003339 - REFORMA SEP', valor: 844000 }
        },
        '2025': {
            '27101 - SEP': { nome: '003339 - REFORMA SEP', valor: 844000 },
            '2601 - SEC. EDUCAÇÃO': { nome: '000002 - D. OBRIG.', valor: 12.5 },
            '2301 - SEC. SAÚDE': { nome: '000002 - D. OBRIG.', valor: 9.1 },
            '2401 - SEC. SEGURANÇA': { nome: '003055 - POL. PREV.', valor: 5.0 },
            '__all__': { nome: '003339 - REFORMA SEP', valor: 844000 }
        },
        '2024': {
            '27101 - SEP': { nome: '000002 - D. OBRIG.', valor: 15.5 },
            '2601 - SEC. EDUCAÇÃO': { nome: '000002 - D. OBRIG.', valor: 10.8 },
            '2301 - SEC. SAÚDE': { nome: '000002 - D. OBRIG.', valor: 7.9 },
            '2401 - SEC. SEGURANÇA': { nome: '003055 - POL. PREV.', valor: 4.3 },
            '__all__': { nome: '000002 - D. OBRIG.', valor: 15.5 }
        }
    };

    function updateTopIndicators(yearsToUse) {
        // 1. Determina o ano mais recente selecionado
        const sortedYears = [...yearsToUse].sort((a, b) => parseInt(b) - parseInt(a));
        const latestYear = sortedYears[0];
        const prevYear = String(parseInt(latestYear) - 1);

        // 2. Determina a UO selecionada (usa __all__ se nenhuma ou múltiplas)
        const uoChoices = choicesMap.get('filter-uo');
        const selectedUOs = uoChoices ? uoChoices.getValue(true) : [];
        const uoKey = (selectedUOs.length === 1) ? selectedUOs[0] : '__all__';

        // 3. Busca dados do ano mais recente
        const yearData = (budgetByYearUO[latestYear] || {})[uoKey] || { disponivel: 0, autorizado: 0, liquidado: 0 };
        const prevData = (budgetByYearUO[prevYear] || {})[uoKey] || { disponivel: 0, autorizado: 0, liquidado: 0 };
        const topPO = ((topPOByYearUO[latestYear] || {})[uoKey]) || { nome: '-', valor: 0 };

        // 4. Cálculos
        const sucesso = yearData.autorizado > 0 ? ((yearData.liquidado / yearData.autorizado) * 100) : 0;
        const comparativo = prevData.liquidado > 0 ? (((yearData.liquidado - prevData.liquidado) / prevData.liquidado) * 100) : 0;
        const compSinal = comparativo >= 0 ? '+' : '';

        // 5. Injeta nos cards
        const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        setEl('top-card-autorizado', yearData.autorizado.toFixed(2).replace('.', ',') + ' B');
        setEl('top-card-dispo', yearData.disponivel.toFixed(2).replace('.', ',') + ' M');
        setEl('top-card-sucesso', sucesso.toFixed(1).replace('.', ',') + '%');
        setEl('top-card-comparativo', compSinal + comparativo.toFixed(2).replace('.', ',') + '%');
        setEl('top-card-po-valor', fmtB(topPO.valor));
        setEl('top-card-po-nome', topPO.nome);

        // Atualiza tooltips (title) com valores cheios
        const dispoCard = document.getElementById('top-card-dispo')?.closest('.col');
        if (dispoCard) dispoCard.title = `Valor Integral: ${fmtFull(yearData.disponivel * 1e6)}`;
        
        const poCard = document.getElementById('card-maior-po-container');
        if (poCard) poCard.title = `Valor Integral: ${fmtFull(topPO.valor)}`;
    }

    document.getElementById('btn-filtrar')?.addEventListener('click', function () {
        updateChips();
        const selectedYears = Array.from(filterRefs.ano.selectedOptions).map(opt => opt.value).filter(v => v !== '');
        const yearsToUse = selectedYears.length > 0 ? selectedYears : ['2026'];

        if (successChart) successChart.setOption(getSuccessChartOptions(yearsToUse), true);
        renderSucessoTable(yearsToUse);
        updateTopIndicators(yearsToUse);

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
        if (successChart) successChart.setOption(getSuccessChartOptions(['2026']), true);
        renderSucessoTable(['2026']);
        updateTopIndicators(['2026']);
    });

    // Inicializar Choices.js Premium
    window.choicesMap = new Map();
    document.querySelectorAll('select.custom-select-filter').forEach(el => {
        const c = new Choices(el, {
            removeItemButton: true,
            searchEnabled: false,
            itemSelectText: "",
            shouldSort: false,
            placeholder: true,
            placeholderValue: el.getAttribute('placeholder') || "Selecione...",
            allowHTML: true
        });
        choicesMap.set(el.id, c);
    });

    // Dynamic Filtering: UO -> Ação
    const uoActionsMap = {
        "27101 - SEP": [
            "2034 - Merenda Escolar",
            "2045 - Transporte Escolar",
            "0012 - Assessoria de Planejamento",
            "0025 - Modernização Administrativa",
            "0033 - Gestão de Contratos Estratégicos"
        ],
        "2601 - SEC. EDUCAÇÃO": [
            "2034 - Merenda Escolar",
            "2045 - Transporte Escolar",
            "2088 - Reforma de Escolas",
            "2100 - Capacitação Pedagógica",
            "2150 - Aquisição de Kits de Robótica",
            "2200 - Manutenção de Creches"
        ],
        "2301 - SEC. SAÚDE": [
            "1022 - Atendimento Básico (PAPS)",
            "1045 - Programa de Vacinação Estadual",
            "1099 - Construção de Hospitais Regionais",
            "1120 - Distribuição de Medicamentos de Alto Custo",
            "1180 - Modernização do SAMU - 192",
            "1250 - Ações de Vigilância Sanitária"
        ],
        "2401 - SEC. SEGURANÇA": [
            "3055 - Policiamento Preventivo e Ostensivo",
            "3012 - Renovação da Frota de Viaturas",
            "3087 - Centro Integrado de Inteligência",
            "3120 - Modernização do Sistema Penitenciário",
            "3150 - Implementação de Câmeras de Monitoramento",
            "3200 - Expansão do Corpo de Bombeiros Militar"
        ]
    };

    const updateAcoes = () => {
        const uoChoices = choicesMap.get('filter-uo');
        const acaoChoices = choicesMap.get('filter-acao');
        if (!uoChoices || !acaoChoices) return;

        const selectedUOs = uoChoices.getValue(true);
        acaoChoices.clearStore();

        let filteredActions = [];
        if (selectedUOs.length === 0) {
            Object.values(uoActionsMap).forEach(actions => {
                filteredActions = filteredActions.concat(actions);
            });
        } else {
            selectedUOs.forEach(uo => {
                if (uoActionsMap[uo]) {
                    filteredActions = filteredActions.concat(uoActionsMap[uo]);
                }
            });
        }

        const choicesData = [...new Set(filteredActions)].map(action => ({
            value: action,
            label: action,
            selected: false,
            disabled: false
        }));

        acaoChoices.setChoices(choicesData, 'value', 'label', true);
    };

    const uoEl = document.getElementById('filter-uo');
    if (uoEl) {
        uoEl.addEventListener('change', updateAcoes);
    }

    // Initial population and synchronization
    setTimeout(() => {
        const uoChoices = choicesMap.get('filter-uo');
        if (uoChoices) {
            uoChoices.setChoiceByValue('27101 - SEP');
        }
        updateAcoes();
        updateChips();
        updateTopIndicators(['2026']);
    }, 200);
});
