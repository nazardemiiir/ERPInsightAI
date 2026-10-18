using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ERPInsightAI.Domain.Enums;

namespace ERPInsightAI.Domain.Entities
{
    public class SalesOrder
    {
        public SalesOrder(
    string orderNumber,
    string customerName,
    string productName,
    int quantity)
        {
            if (string.IsNullOrWhiteSpace(orderNumber))
                throw new ArgumentException("Sipariş numarası boş olamaz.");

            if (string.IsNullOrWhiteSpace(customerName))
                throw new ArgumentException("Müşteri adı boş olamaz.");

            if (string.IsNullOrWhiteSpace(productName))
                throw new ArgumentException("Ürün adı boş olamaz.");

            if (quantity <= 0)
                throw new ArgumentException("Sipariş miktarı sıfırdan büyük olmalıdır.");

            Id = Guid.NewGuid();
            OrderNumber = orderNumber;
            CustomerName = customerName;
            ProductName = productName;
            Quantity = quantity;
            OrderDate = DateTime.Now;
        }
        public Guid Id { get; private set; }

        public string OrderNumber { get; private set; } = string.Empty;

        public string CustomerName { get; private set; } = string.Empty;

        public string ProductName { get; private set; } = string.Empty;

        public int Quantity { get; private set; }

        public DateTime OrderDate { get; private set; }

        public DateTime PlannedStartDate { get; set; }

        public DateTime PlannedEndDate { get; set; }

        public DateTime? ActualStartDate { get; set; }

        public DateTime? ActualEndDate { get; set; }

        public OrderStatus Status { get; private set; } = OrderStatus.Waiting;
        public void StartProduction()
        {
            if (Status != OrderStatus.Waiting)
                throw new InvalidOperationException("Sadece bekleyen sipariş üretime alınabilir.");

            Status = OrderStatus.InProduction;
        }
        public void MarkAsCompleted()
        {
            if (Status != OrderStatus.InProduction)
                throw new InvalidOperationException("Sadece üretimde olan sipariş tamamlanabilir.");

            Status = OrderStatus.Completed;
            ActualEndDate = DateTime.Now;
        }

    }
}
