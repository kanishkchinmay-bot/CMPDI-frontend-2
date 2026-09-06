export const kpiMetrics = [
  {
    id: "boreholes",
    title: "TOTAL BOREHOLES",
    value: "1,248",
    trend: "+12%",
    trendPeriod: "this month",
    trendPositive: true,
    iconType: "architecture",
    description: "Active & completed exploratory drill holes"
  },
  {
    id: "layers",
    title: "STRATIGRAPHIC LAYERS",
    value: "8,932",
    trend: "+5%",
    trendPeriod: "this month",
    trendPositive: true,
    iconType: "layers",
    description: "Digitized lithological horizons"
  },
  {
    id: "samples",
    title: "CORE SAMPLES",
    value: "45.2k",
    trend: "Steady rate",
    trendPeriod: "normal variance",
    trendPositive: null,
    iconType: "science",
    description: "Geotechnical & chemical core assays"
  },
  {
    id: "accuracy",
    title: "MODEL ACCURACY",
    value: "94.8%",
    trend: "+2.1%",
    trendPeriod: "improvement",
    trendPositive: true,
    iconType: "verified",
    description: "SeamNet-v4 stratigraphic confidence"
  }
];

export const strataDistributionDataByQuarter = {
  "Q3 2023": [
    { block: "Block A", coalSeam: 142, sandstone: 98, overburden: 45, confidence: 96.2, avgThickness: "14.2m" },
    { block: "Block B", coalSeam: 188, sandstone: 124, overburden: 62, confidence: 94.8, avgThickness: "18.8m" },
    { block: "Block C", coalSeam: 215, sandstone: 160, overburden: 88, confidence: 98.1, avgThickness: "21.5m" },
    { block: "Block D", coalSeam: 175, sandstone: 140, overburden: 54, confidence: 93.4, avgThickness: "17.5m" },
    { block: "Block E", coalSeam: 260, sandstone: 195, overburden: 95, confidence: 97.6, avgThickness: "26.0m" },
    { block: "Block F", coalSeam: 190, sandstone: 130, overburden: 70, confidence: 95.0, avgThickness: "19.0m" }
  ],
  "Q2 2023": [
    { block: "Block A", coalSeam: 130, sandstone: 90, overburden: 40, confidence: 95.1, avgThickness: "13.0m" },
    { block: "Block B", coalSeam: 172, sandstone: 115, overburden: 58, confidence: 93.9, avgThickness: "17.2m" },
    { block: "Block C", coalSeam: 200, sandstone: 152, overburden: 80, confidence: 97.3, avgThickness: "20.0m" },
    { block: "Block D", coalSeam: 162, sandstone: 132, overburden: 50, confidence: 92.8, avgThickness: "16.2m" },
    { block: "Block E", coalSeam: 245, sandstone: 180, overburden: 90, confidence: 96.8, avgThickness: "24.5m" },
    { block: "Block F", coalSeam: 180, sandstone: 122, overburden: 65, confidence: 94.2, avgThickness: "18.0m" }
  ],
  "Q1 2023": [
    { block: "Block A", coalSeam: 118, sandstone: 82, overburden: 36, confidence: 94.0, avgThickness: "11.8m" },
    { block: "Block B", coalSeam: 155, sandstone: 104, overburden: 52, confidence: 92.5, avgThickness: "15.5m" },
    { block: "Block C", coalSeam: 185, sandstone: 138, overburden: 74, confidence: 96.0, avgThickness: "18.5m" },
    { block: "Block D", coalSeam: 150, sandstone: 120, overburden: 45, confidence: 91.5, avgThickness: "15.0m" },
    { block: "Block E", coalSeam: 228, sandstone: 168, overburden: 82, confidence: 95.4, avgThickness: "22.8m" },
    { block: "Block F", coalSeam: 168, sandstone: 114, overburden: 60, confidence: 93.0, avgThickness: "16.8m" }
  ],
  "Q4 2022": [
    { block: "Block A", coalSeam: 105, sandstone: 75, overburden: 30, confidence: 93.2, avgThickness: "10.5m" },
    { block: "Block B", coalSeam: 140, sandstone: 95, overburden: 48, confidence: 91.8, avgThickness: "14.0m" },
    { block: "Block C", coalSeam: 170, sandstone: 125, overburden: 68, confidence: 95.0, avgThickness: "17.0m" },
    { block: "Block D", coalSeam: 138, sandstone: 110, overburden: 40, confidence: 90.2, avgThickness: "13.8m" },
    { block: "Block E", coalSeam: 210, sandstone: 155, overburden: 75, confidence: 94.1, avgThickness: "21.0m" },
    { block: "Block F", coalSeam: 155, sandstone: 105, overburden: 55, confidence: 92.0, avgThickness: "15.5m" }
  ]
};

export const resourceAllocationData = {
  coverage: "100%",
  totalVolume: "4.82 MT",
  segments: [
    {
      name: "Primary Seam",
      percentage: 52,
      volume: "2.51 MT",
      color: "#1E293B",
      description: "High-yield commercial metallurgical & power coal horizons"
    },
    {
      name: "Overburden",
      percentage: 31,
      volume: "1.49 MT",
      color: "#475569",
      description: "Alluvial soil, weathered shale & coarse sandstone cap"
    },
    {
      name: "Interburden",
      percentage: 17,
      volume: "0.82 MT",
      color: "#94A3B8",
      description: "Siltstone & carbonaceous parting bands between seams"
    }
  ],
  benchmarks: [
    { label: "Stripping Ratio", value: "1.85 : 1", status: "Optimal" },
    { label: "Reserve Grade", value: "G-3 Prime", status: "High Quality" },
    { label: "Extraction Feasibility", value: "92.4%", status: "Approved" }
  ]
};

export const recentGeologicalSurveys = [
  {
    id: "BH-2023-NK-041",
    block: "North Karanpura Block IV",
    basin: "Damodar Valley Basin",
    depth: 382.4,
    thickness: 14.2,
    grade: "G-4 Semi-Coking",
    accuracy: 98.2,
    status: "Completed",
    date: "Sep 04, 2026",
    surveyor: "Dr. S. K. Roy",
    coordinates: "23.8512° N, 85.1248° E",
    formation: "Barakar Formation (Lower Gondwana)",
    moisture: "2.4%",
    ashContent: "18.6%",
    volatileMatter: "28.5%",
    gcv: "6,240 kcal/kg",
    layers: [
      { depth: "0 - 45m", type: "Overburden Alluvium & Sandstone", color: "#CBD5E1" },
      { depth: "45 - 120m", type: "Coarse Grey Sandstone", color: "#94A3B8" },
      { depth: "120 - 134.2m", type: "Seam VII (G-4 Semi-Coking)", color: "#1E293B" },
      { depth: "134.2 - 210m", type: "Interburden Carbonaceous Shale", color: "#64748B" },
      { depth: "210 - 228.5m", type: "Seam V (Prime Coking)", color: "#0F172A" },
      { depth: "228.5 - 382.4m", type: "Basal Sandstone & Quartzite", color: "#475569" }
    ]
  },
  {
    id: "BH-2023-JR-108",
    block: "Jharia Seam IX-X Deep",
    basin: "Jharia Coalfield",
    depth: 518.0,
    thickness: 22.8,
    grade: "G-2 Prime Coking",
    accuracy: 96.5,
    status: "Validated",
    date: "Sep 02, 2026",
    surveyor: "P. Mukherjee (Chief Geo)",
    coordinates: "23.7541° N, 86.4190° E",
    formation: "Raniganj Formation",
    moisture: "1.8%",
    ashContent: "14.2%",
    volatileMatter: "24.1%",
    gcv: "6,880 kcal/kg",
    layers: [
      { depth: "0 - 80m", type: "Sandstone & Silty Clay", color: "#CBD5E1" },
      { depth: "80 - 240m", type: "Medium Sandstone Horizon", color: "#94A3B8" },
      { depth: "240 - 262.8m", type: "Seam IX/X Composite (Prime)", color: "#1E293B" },
      { depth: "262.8 - 410m", type: "Shale Parting & Siltstone", color: "#64748B" },
      { depth: "410 - 518m", type: "Massive Feldspathic Sandstone", color: "#475569" }
    ]
  },
  {
    id: "BH-2023-RG-019",
    block: "Raniganj Deep South",
    basin: "Raniganj Coalfield",
    depth: 642.5,
    thickness: 18.5,
    grade: "G-5 Non-Coking",
    accuracy: 94.8,
    status: "In Processing",
    date: "Aug 29, 2026",
    surveyor: "A. Sengupta",
    coordinates: "23.6189° N, 87.0543° E",
    formation: "Dishergarh / Barakar Stage",
    moisture: "3.5%",
    ashContent: "21.4%",
    volatileMatter: "31.2%",
    gcv: "5,750 kcal/kg",
    layers: [
      { depth: "0 - 110m", type: "Tertiary Overburden & Sand", color: "#CBD5E1" },
      { depth: "110 - 320m", type: "Interbedded Shale & Sandstone", color: "#94A3B8" },
      { depth: "320 - 338.5m", type: "Dishergarh Seam", color: "#1E293B" },
      { depth: "338.5 - 642.5m", type: "Lower Barakar Sandstones", color: "#475569" }
    ]
  },
  {
    id: "BH-2023-BL-082",
    block: "Bokaro East Basin Block B",
    basin: "East Bokaro Coalfield",
    depth: 409.2,
    thickness: 9.4,
    grade: "G-3 Coking",
    accuracy: 91.2,
    status: "Under Review",
    date: "Aug 27, 2026",
    surveyor: "Dr. K. N. Verma",
    coordinates: "23.7820° N, 85.9411° E",
    formation: "Kargali Seam Horizon",
    moisture: "2.1%",
    ashContent: "16.8%",
    volatileMatter: "25.7%",
    gcv: "6,410 kcal/kg",
    layers: [
      { depth: "0 - 65m", type: "Upper Regolith & Sandstone", color: "#CBD5E1" },
      { depth: "65 - 210m", type: "Barren Measure Shale", color: "#94A3B8" },
      { depth: "210 - 219.4m", type: "Kargali Top Seam", color: "#1E293B" },
      { depth: "219.4 - 409.2m", type: "Sub-surface Basal Rock", color: "#475569" }
    ]
  },
  {
    id: "BH-2023-SG-055",
    block: "Singrauli Moher Basin",
    basin: "Son Valley Coalfield",
    depth: 294.6,
    thickness: 16.1,
    grade: "G-6 Thermal High-Yield",
    accuracy: 97.4,
    status: "Completed",
    date: "Aug 25, 2026",
    surveyor: "M. R. Tiwari",
    coordinates: "24.1983° N, 82.6685° E",
    formation: "Turra / Purewa Seam",
    moisture: "5.8%",
    ashContent: "24.0%",
    volatileMatter: "33.8%",
    gcv: "4,950 kcal/kg",
    layers: [
      { depth: "0 - 35m", type: "Soft Weathered Soil Cap", color: "#CBD5E1" },
      { depth: "35 - 140m", type: "Coarse White Sandstone", color: "#94A3B8" },
      { depth: "140 - 156.1m", type: "Purewa Bottom Seam", color: "#1E293B" },
      { depth: "156.1 - 294.6m", type: "Siltstone Footwall", color: "#475569" }
    ]
  },
  {
    id: "BH-2023-TA-112",
    block: "Talcher Main Coal Belt",
    basin: "Mahanadi Valley Coalfield",
    depth: 475.1,
    thickness: 12.3,
    grade: "G-4 Semi-Coking",
    accuracy: 95.8,
    status: "Validated",
    date: "Aug 21, 2026",
    surveyor: "R. B. Das",
    coordinates: "20.9504° N, 85.2167° E",
    formation: "Barakar Stage II",
    moisture: "4.2%",
    ashContent: "19.5%",
    volatileMatter: "29.1%",
    gcv: "5,820 kcal/kg",
    layers: [
      { depth: "0 - 50m", type: "Alluvial Topstrata", color: "#CBD5E1" },
      { depth: "50 - 220m", type: "Fining-upward Sandstone", color: "#94A3B8" },
      { depth: "220 - 232.3m", type: "Seam I (Main Thick)", color: "#1E293B" },
      { depth: "232.3 - 475.1m", type: "Basal Tillite & Metasediment", color: "#475569" }
    ]
  }
];

export const notificationsList = [
  {
    id: 1,
    title: "Borehole BH-2023-NK-041 Validated",
    time: "12m ago",
    type: "success",
    desc: "AI Stratigraphic model confirmed 14.2m coal seam thickness at 98.2% confidence."
  },
  {
    id: 2,
    title: "High Calorific Coal Detected",
    time: "1h ago",
    type: "alert",
    desc: "Jharia Deep Block IX showed G-2 Prime Coking grade with GCV > 6,880 kcal/kg."
  },
  {
    id: 3,
    title: "Seam Fault Discontinuity Warning",
    time: "4h ago",
    type: "warning",
    desc: "Seismic 3D inversion in Bokaro Block B indicates minor fault line displacement of 4.5m."
  },
  {
    id: 4,
    title: "Geological Model Sync Complete",
    time: "Yesterday",
    type: "info",
    desc: "Damodar Valley Basin master grid updated with 42 new core sample assays."
  }
];
