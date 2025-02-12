export interface Customer {
    id: string;
    name: string;
    email: string;
}

export interface Invoice {
    id: string;
    customerId: string;
    amount: number;
    dueDate: string;
}

export interface Payment {
    id: string;
    invoiceId: string;
    amount: number;
    paymentDate: string;
}
