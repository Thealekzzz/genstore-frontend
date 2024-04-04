const numericFieldsToCount = ["TPI", "NM$", "CM$", "FM$", "GM$", "Milk", "Protein", "Prot%", "Fat", "Fat %", "CFP", "FE", "Feed Saved", "Prel", "PL", "C-LIV", "H-LIV", "DPR", "SCS", "SCE", "SCE Rel", "SCE Obs", "DCE", "SSB", "DSB", "CCR", "HCR", "EFC", "GL", "MAST", "KET", "RP", "MET", "DA", "MF", "DWP$", "WT$", "CW$", "PTAT", "UDC", "FLC", "BWC", "DC", "TRel", "Stature", "Strength", "Body Depth", "Dairy form", "Rump Angle", "Thurl Width", "RLSV", "RLRV", "Foot Angle", "FLS", "F. Udder Att.", "R Udder Height", "Rear Udder Width", "Udder Cleft", "Udder Depth", "FTP", "RTP", "Teat Length", "RHA", "EFI"];

export default function getAvarageValues(bulls) {
  const acc = {};
  const result = {};

  numericFieldsToCount.forEach((fieldName) => {
    bulls.forEach((bull) => {
      if (bull[fieldName] && !isNaN(+bull[fieldName])) {
        if (!acc[fieldName]) {
          acc[fieldName] = { count: 0, value: 0 };
        }

        acc[fieldName].value += +bull[fieldName];
        acc[fieldName].count += 1;
      }
    });

    try {
      if (acc[fieldName]?.count) {
        result[fieldName] = acc[fieldName].value / acc[fieldName].count;
        
      } else {
        result[fieldName] = 0;
        
      }

    } catch (e) {
      console.error("Ошибка при расчете среднего значения характеристик");
      console.log(e);
    }    
  });

  return result;
}
