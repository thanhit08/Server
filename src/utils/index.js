var that = module.exports = {
    checkMissingParams: (arrCheck, arrQuery) => {
        /*
            Check missing params 
            arrCheck - params can check [LOGIN, FK100, ...]
            arrQuery - params nhan duoc tu reques [LOGIN, FK100, QV101 ...]
  
            return 
            {flag: false, code: `Missing ${element}`}
            {flag: true, code: 'is Okay'}
        */
        console.log('[2021]:::checkMissingParams::::', arrCheck, arrQuery);
        for (let i = 0; i < arrCheck.length; i++) {
            const element = arrCheck[i];
            if(!arrQuery.includes(element)){
                return {flag: false, code: `Missing ${element}`}
            }
        }
        return {flag: true, code: 'is Okay'}
    },
  }