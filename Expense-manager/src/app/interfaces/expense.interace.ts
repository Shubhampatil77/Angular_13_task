export interface AddExpensePayload{
    accesstoken: string,
    account_id: number,
    amount : string,
    category_id : number,
    chemist_id : number,
    cheque_date: string,
    device_id :  string,
    expense_date: string,
    payment_date: string,
    payment_method_id: 1
    reference_no:string ,
    transaction_type:string
    remark: string,
    gst_percentage?:string,
    gstn_number?:string,
    party_name?:string

}

export interface AddExpenseResponse{
    ng_version: string,
    datetime: string,
    status_code: string,
    status_message: string,
    data: any
}

export interface Expense {
    description: string,
    total: number,
    total_amount:number,
    total_income:number,
    payment_status: number,
    expense_by_name:string
    account_id: number,
    amount : string,
    category_id : number,
    chemist_id : number,
    cheque_date: string,
    device_id :  string,
    expense_date: string,
    payment_date: string,
    payment_method_id: string
    reference_no:string ,
    remark: string,
    id: number
}


export interface GetExpensePayload {
  accesstoken: string;
  chemist_id: number;
  device_id: string;
  end_date: string;
  export: number;
  order: string;
  orderby: string;
  page: number;
  search_by_entity_id: number;
  start_date: string;
  category_id:number
}
export interface GetExpenseResponse {
    datetime: string,
    status_code: string,
    status_message: string,
    data: {
        rpp:string,
        current_page:number,
        total_expense: number,
        total_income:number,
        total_amount:number,
        payment_methods:payment[],
        expense_categories:category[],
        bank_accounts: [],
        staff_list:staff[],
        results: Expense[];
      }
  

    
} 
 export interface DeleteExpensePayload {
    accesstoken: string;
    chemist_id: number;
    device_id: string;
    expense_id: number;
  }

     export interface DeleteExpenseResponse {
        datetime: string,
    status_code: string,
    status_message: string,
    data: {
        rpp:string,
        current_page:number,
        total_expense: number
        payment_methods:payment[],
        categories:category[],
        bank_accounts: [],
        staff_list:staff[],
        results: Expense[];
     }
    
    }
export interface payment{
    id: number,
   method_name: string,

}

export interface category{
    id: number,
     category: string
}
export interface staff {

    id: 1005,
    fullname: string,
         status: string,
               
}