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
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading,setLoading] =useState(true);
    const [filter,setFilter] = useState<TransactionFilter>({});
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
    const [drawerOpen,setDrawerOpen] = useState(false);


   const loadTransactions = async (f?: TransactionFilter) => {
        setLoading(true);
        const data = await cardService.getTransactions(f || filter);
        setTransactions(data);
        setLoading(false);
    
};

useEffect(() => {loadTransactions();},[]);

const handleFilterChange = (key:string,value:string | undefined) => {
    const newFilter = {...filter,[key]:value || undefined };
    setFilter(newFilter);
    loadTransactions(newFilter);
};

const handleDateRange = (dates:[dayjs.Dayjs | null,dayjs.Dayjs | null] | null) => {
    const newFilter = {...filter,dateFrom:dates?.
        [0]?.format("YYYY-MM-DD") ||  undefined, dateTo: dates?.
        [1]?.format ("YYYY-MM-DD") || undefined };
        setFilter(newFilter);
        loadTransactions(newFilter);
    
};


const handleClearFilters = () => {
    setFilter ({});
    loadTransactions({});
};


const totalDebit = transactions.filter((t) => t.type === 'debit' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
const totalCredit = transactions.filter((t) => t.type === 'credit' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
const categories = Array.from(new Set(transactions.map((t) => t.category))
);


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
 <Space direction="vertical" size="large" style={{ width: "100%"}}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div>
 <Title level={3} style={{ marginBottom: 4}}>Əməliyyatlar</Title>
 <Text type="secondary">Bütün kart əməliyyatlarınız</Text>
 </div>
 </div>


<Row gutter={[16, 16]}>
 <Col xs={24} sm={8}>
 <Card size="small">
 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
 <div style={{ width: 40, height: 40, borderRadius: 8,background: token.colorSuccessBg, display: "flex", alignItems:
"center", justifyContent: "center" }}>
 <ArrowUpOutlined style={{ color:token.colorSuccess, fontSize: 18 }} />
 </div>
 <div>
 <Text type="secondary" style={{ fontSize: 12}}>Gələn</Text>
 <div style={{ fontSize: 18, fontWeight: 600, color:token.colorSuccess }}>₼{totalCredit.toFixed(2)}</div>
 </div>
 </div>
 </Card>
</Col>


 <Col xs={24} sm={8}>
 <Card size="small">
 <div style={{ display: "flex", alignItems: "center",gap: 12 }}>
 <div style={{ width: 40, height: 40, borderRadius: 8,background: token.colorErrorBg, display: "flex", alignItems:
"center", justifyContent: "center" }}>
 <ArrowDownOutlined style={{ color:token.colorError, fontSize: 18 }} />
 </div>
 <div>
 <Text type="secondary" style={{ fontSize: 12}}>Gedən</Text>
 <div style={{ fontSize: 18, fontWeight: 600, color:token.colorError }}>₼{totalDebit.toFixed(2)}</div>
 </div>
 </div>
 </Card>
 </Col>


 <Col xs={24} sm={8}>
 <Card size="small">
 <div style={{ display: "flex", alignItems: "center",gap: 12 }}>
 <div style={{ width: 40, height: 40, borderRadius: 8,background: token.colorPrimaryBg, display: "flex", alignItems:
"center", justifyContent: "center" }}>
 <FilterOutlined style={{ color: token.colorPrimary,fontSize: 18 }} />
 </div>
 <div>
 <Text type="secondary" style={{ fontSize: 12}}>Balans</Text>
 <div style={{ fontSize: 18, fontWeight: 600, color:totalCredit - totalDebit >= 0 ? token.colorSuccess :
token.colorError }}>
 ₼{(totalCredit - totalDebit).toFixed(2)}
 </div>
 </div>
 </div>
 </Card>
 </Col>
 </Row>


<Card size="small">
 <Row gutter={[12, 12]} align="middle">
 <Col xs={24} sm={8} md={6}>
 <Input placeholder="Axtar..." prefix={<SearchOutlined/>} value={filter.search} onChange={(e) =>
handleFilterChange("search", e.target.value)} allowClear />


</Col>
 <Col xs={24} sm={8} md={6}>
 <Select placeholder="Kateqoriya" style={{ width: "100%"}} value={filter.category} onChange={(v) =>
handleFilterChange("category", v)} allowClear>
 {categories.map((c) => (<Select.Option key={c} value={c}>{c}</Select.Option>))}
 </Select>
 </Col>
 <Col xs={24} sm={8} md={5}>
 <Select placeholder="Status" style={{ width: "100%" }} 
value={filter.status} onChange={(v) => handleFilterChange("status", v)} allowClear>
 <Select.Option
value="completed">Tamamlanıb</Select.Option>
 <Select.Option value="pending">Gözləyir</Select.Option>
 <Select.Option value="failed">Uğursuz</Select.Option>
 </Select>
 </Col>
 <Col xs={24} sm={12} md={5}>
 <RangePicker style={{ width: "100%" }} onChange={(dates) => handleDateRange(dates as [dayjs.Dayjs | null,
dayjs.Dayjs | null] | null)} />
 </Col>
 <Col xs={24} sm={12} md={2}>
 <Button onClick={handleClearFilters}
block>Təmizlə</Button>
 </Col>
 </Row>
 </Card>


 <Card styles={{ body: { padding: 0 } }}>
 <Table
 dataSource={transactions}
 columns={columns}
 rowKey="id"
 loading={loading}
 pagination={{ pageSize: 10, showSizeChanger: true, 
showTotal: (total) => `${total} əməliyyat` }}
 />
 </Card>




 <Drawer title="Əməliyyat Detalları" open={drawerOpen}
onClose={() => setDrawerOpen(false)} width={420}>
 {selectedTx && (
 <Descriptions column={1} bordered size="small">
 <Descriptions.Item label="Əməliyyat">
{selectedTx.description}</Descriptions.Item>
 <Descriptions.Item label="Merchant">
{selectedTx.merchant}</Descriptions.Item>
 <Descriptions.Item label="Kateqoriya"><Tag>
{selectedTx.category}</Tag></Descriptions.Item>
 <Descriptions.Item label="Məbləğ">
 <Text style={{ color: selectedTx.type === "credit" ? 
token.colorSuccess : token.colorError, fontWeight: 600, fontSize:16 }}>
 {selectedTx.type === "credit" ? "+" : "-"}₼
{selectedTx.amount.toFixed(2)}
 </Text>
 </Descriptions.Item>
 <Descriptions.Item label="Tarix">{new
Date(selectedTx.date).toLocaleDateString("az-AZ")}
</Descriptions.Item>
 <Descriptions.Item label="Status">
 <Tag color={selectedTx.status === "completed" ?
"success" : selectedTx.status === "pending" ? "warning" : "error"}>
 {selectedTx.status}
 </Tag>
 </Descriptions.Item>
 <Descriptions.Item label="Kart ID">{selectedTx.cardId}
</Descriptions.Item>
 <Descriptions.Item label="Referans">
{selectedTx.reference}</Descriptions.Item>
 </Descriptions>
 )}
 </Drawer>

</Space>
);
}
 



