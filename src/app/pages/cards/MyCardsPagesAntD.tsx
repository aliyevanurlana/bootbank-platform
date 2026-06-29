import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Space,
  Button,
  Switch,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  message,
  Popconfirm,
  theme,
} from "antd";
import {
  CreditCardOutlined,
  PlusOutlined,
  LockOutlined,
  UnlockOutlined,
  WifiOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { cardService } from "../../services/cards/cardService";
import type { Card as CardType } from "../../services/cards/types";

const { Title, Text } = Typography;

const currencySymbol: Record<string, string> = {
  AZN: "₼",
  USD: "$",
  EUR: "€",
};

export function MyCards() {
  const { token } = theme.useToken();
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form] = Form.useForm();

  const loadCards = async () => {
    setLoading(true);
    try {
      const data = await cardService.getCards();
      setCards(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleCreateCard = async (values: {
    name: string;
    currency: string;
    limit: number;
  }) => {
    setCreating(true);
    try {
      await cardService.createCard(values);
      message.success("Virtual kart yaradıldı");
      setModalOpen(false);
      form.resetFields();
      await loadCards();
    } catch {
      message.error("Xəta baş verdi");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleBlock = async (card: CardType) => {
    try {
      await cardService.blockCard(card.id);
      message.success(
        card.status === "blocked" ? "Kart aktiv edildi" : "Kart bloklandı"
      );
      await loadCards();
    } catch {
      message.error("Əməliyyat uğursuz oldu");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    active: "green",
    blocked: "red",
    expired: "default",
  };

  const cardGradients: Record<string, string> = {
    AZN: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
    USD: "linear-gradient(135deg,#0d1b2a,#1b263b,#415a77)",
    EUR: "linear-gradient(135deg,#2d1b69,#5b2c8e,#7b2cbf)",
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            Kartlarım
          </Title>
          <Text type="secondary">Bütün kartlarınızı idarə edin</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalOpen(true)}
        >
          Virtual Kart Yarat
        </Button>
      </div>

      {/* Cards */}
      <Row gutter={[20, 20]}>
        {cards.map((card) => (
          <Col xs={24} md={12} xl={8} key={card.id}>
            <Card
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              }}
              styles={{ body: { padding: 0 } }}
            >
              <div
                style={{
                  background:
                    cardGradients[card.currency] || cardGradients.AZN,
                  padding: 24,
                  minHeight: 180,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Text style={{ color: "#fff" }}>{card.type}</Text>
                    <div style={{ color: "#fff", fontWeight: 600 }}>
                      {card.name}
                    </div>
                  </div>

                  <Tag color={statusColor[card.status]}>
                    {card.status.toUpperCase()}
                  </Tag>
                </div>

                <div
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    margin: "20px 0",
                  }}
                >
                  •••• •••• •••• {card.last4}
                </div>

                <div style={{ color: "#fff" }}>
                  {currencySymbol[card.currency]}
                  {(card.limit - card.used).toLocaleString()}
                </div>
              </div>

              <div style={{ padding: 20 }}>
                <Row gutter={[12, 12]}>
                  <Col span={12}>
                    <Space>
                      <GlobalOutlined style={{ color: token.colorPrimary }} />
                      <Text>Online</Text>
                      <Switch
                        size="small"
                        checked={card.onlinePayment}
                        disabled={card.status !== "active"}
                      />
                    </Space>
                  </Col>

                  <Col span={12}>
                    <Space>
                      <WifiOutlined style={{ color: token.colorSuccess }} />
                      <Text>NFC</Text>
                      <Switch
                        size="small"
                        checked={card.contactless}
                        disabled={card.status !== "active"}
                      />
                    </Space>
                  </Col>
                </Row>

                <div style={{ marginTop: 16 }}>
                  <Text type="secondary">
                    Limit: {currencySymbol[card.currency]}
                    {card.limit.toLocaleString()}
                  </Text>

                  <br />

                  <Text type="secondary">
                    İstifadə: {currencySymbol[card.currency]}
                    {card.used.toLocaleString()}
                  </Text>
                </div>

                {card.status !== "expired" && (
                  <div style={{ marginTop: 16 }}>
                    <Popconfirm
                      title={
                        card.status === "blocked"
                          ? "Kartı aktiv etmək istəyirsiniz?"
                          : "Kartı bloklamaq istəyirsiniz?"
                      }
                      onConfirm={() => handleToggleBlock(card)}
                      okText="Bəli"
                      cancelText="Xeyr"
                    >
                      <Button
                        size="small"
                        danger={card.status === "active"}
                        type={
                          card.status === "blocked" ? "primary" : "default"
                        }
                        icon={
                          card.status === "blocked" ? (
                            <UnlockOutlined />
                          ) : (
                            <LockOutlined />
                          )
                        }
                      >
                        {card.status === "blocked" ? "Aktiv Et" : "Blokla"}
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal
        title={
          <Space>
            <CreditCardOutlined />
            Virtual Kart Yarat
          </Space>
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateCard}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="name"
            label="Kart adı"
            rules={[{ required: true, message: "Kart adı daxil edin" }]}
          >
            <Input placeholder="Məs: Shopping Card" />
          </Form.Item>

          <Form.Item
            name="currency"
            label="Valyuta"
            rules={[{ required: true, message: "Valyuta seçin" }]}
          >
            <Select placeholder="Valyuta seçin">
              <Select.Option value="AZN">AZN</Select.Option>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="limit"
            label="Limit"
            rules={[{ required: true, message: "Limit daxil edin" }]}
          >
            <InputNumber
              min={100}
              max={50000}
              step={100}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setModalOpen(false);
                  form.resetFields();
                }}
              >
                Ləğv et
              </Button>

              <Button type="primary" htmlType="submit" loading={creating}>
                Yarat
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
}