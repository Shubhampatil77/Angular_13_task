// fetch-bank-details.interface.ts
export interface FetchBankDetailsPayload {
  accesstoken: string;
  chemist_id: number;
  device_id: string;
  orderby: string;
  order: string;
  start_date: string;
  end_date: string;
  page: number;
}


export interface FetchPassbookDetailsPayload {
  accesstoken: string;
  chemist_id: number; 
  device_id: string;
  account_id: number;
  orderby: string;
  order: string;
  start_date: string; 
  end_date: string;  
  page: number;
  is_pdc: string;
  passbook_page: number;
  pdc_page: number;
  search_by_id: number;
  remarks:string;
  // cheque_no:string

}

export interface addOrUpdateBankTransactionPayload {
  accesstoken: string;
  account_id: number;
  amount: number;
  chemist_id: number;
  cheque_no: number;
  clearance_date: string;
  date: string;
  device_id: string;
  end_date:string;
  party_name:string;
  payment_method_id:string;
  remark:string;
  start_date:string;
  transaction_type: string;

      }

      export interface searchBankNamePayload{
        searchstring: string,
        accesstoken: string,
        chemist_id: string,
        device_id: string,
         // Replace with actual device ID
    };
    
    export interface Bank {
id: any;
      bank_name: string;
      bank_id: number;
      // Add any other properties that come with the response
    }
    

    export interface deleteBankTransaction{
      accesstoken: string, 
      account_number: string,
      bank_id: number,
        chemist_id: number, 
        device_id: string,
      id: number, 

    }
   
    export interface deleteBankTransactionPDC{
      chemist_id: number, 
      pdc_id: number, 
        accesstoken: string, 
        device_id: string
    }

    export interface deleteBankAccount{
      accesstoken : string,
      account_id : number,
      authentication_code:string,
      chemist_id:number,
      device_id:string,
      status:string
    }

    export interface bankAccountActiveInactive{

    accesstoken:string,
      account_id:number,
      authentication_code:string,
      chemist_id:number,
      device_id:string,
      status:string
        }

       export interface Transaction {
          id: number;
          // add other properties as needed
      }
      