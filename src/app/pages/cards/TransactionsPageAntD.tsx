import { useState,useEffect} from "react";
import {Card,Table,Typography,Tag,Space,Input,Select,DatePicker,Button,Row,Col,Drawer,Descriptions,Spin,theme} from "antd";
import { SearchOutlined,FilterOutlined,ArrowUpOutlined,ArrowDownOutlined,DownloadOutlined,EyeOutlined} from "@ant-design/icons";
import {cardService} from "../../services/cards/cardService";
import type {Transaction,TransactionFilter} from "../../services/cards/types";
import type { ColumnsType}from "antd/es/table";
import dayjs from "dayjs";

const {Title,Text} = Typography;
const { RangePicker} = DatePicker;

export function Transactions() {
    const { token } = theme.useToken();
    const [transactions,setTransactions] = useState<Transaction>[]>([]);
    const [loading,setLoading] =useState(true);
    const [filter,setFilter] = useState<TransactionFilter>({});
    const [selectedTx,setSelectedTx] = useState<Transaction null>(null);
    const [drawerOpen,setDrawerOpen] = useState(false);


    const loadTransactions = async(f? TransactionFilter) => {
        setLoading(true);
        const data = await cardService.getTransactions(f   filter);
        setTransactions(data);
        setLoading(false);
    }
};

useEffect(() => {loadTransactions();},[]);

const handleFilterChange = (key:string,value:string undefined => {
    const newFilter = {...filter,[key]:value  undefined };
    setFilter(newFilter);
    loadTransactions(newFilter);
};

const handleDateRange = (dates:[dayjs.Dayjs  null,dayjs.Dayjs  null] null) => {
    const newFilter = {...filter,dateFrom:dates?.[0]?.format("YYYY-MM-DD")  undefined,
        setFilter(newFilter);
        loadTransactions(newFilter);
    }
};


const handleClearFilters = () => {
    setFilter ({});
    loadTransactions({});
};


const totalDebit = transactions.filter((t) => t.type === 'debit' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
const totalCredit = transactions.filter((t) => t.type === 'credit' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
const categories = Array.from(new Set(Transactions.map((t) => t.category))));


//Sütunların konfiqurasiyası
const columns:ColumnsType<Transaction> =[ 
{

title:" əməliyyat",dataIndex:"description",key:"description",
render: (text: string, record) => (<div><div style={{ fontWeight: 500 }}>{text}</div><Text type="secondary" style={{fontSize:12}}>{record.merchant}</Text></div>),
},

{ title: "Kateqoriya", dataIndex: "category", key: "category", render: (cat: string) => <Tag>{cat}</Tag>},
{ title: "Tarix", dataIndex: "date", key: "date", render: (date: string) => new Date(date).toLocaleDateString("az-AZ")},
 {
 title: "Məbləğ", dataIndex: "amount", key: "amount", align: "right",
 render: (amount: number, record) => (
 <Text style={{ color: record.type === "credit" ? token.colorSuccess : token.colorError,fontWeight:600}}>
 {record.type === "credit" ? "+" : "-"} {amount.toFixed(2)}
 </Text>
 ),
 },

 {

    title: "Status", dataIndex: "status", key: "status",
    render: (status: string) => (
 <Tag color={status === "completed" ? "success" : status === "pending" ? "warning" : "error"}></Tag>
 ),
 },

 {
 title: "", key: "actions", width: 50,
 render: (_: unknown, record: Transaction) => (
    <Button type="text" icon={<EyeOutlined />} onClick={() => { setSelectedTx(record); setDrawerOpen(true);}} />
 ),
},
];


return (
 <Space direction="vertical" size="large" style={{ width: "100%" }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
 <div>
 <Title level={3} style={{ marginBottom: 4 }}></Title>
<Text type="secondary">Bütün kart əməliyyatlarınız</Text>
</div>
</div>
</Space>
);
