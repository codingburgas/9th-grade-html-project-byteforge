
const ctx = document.getElementById('incidentChart').getContext('2d');

const incidentChart = new Chart(ctx, {
  type: 'bar', 
  data: {

    labels: ['Януари', 'Февруари', 'Март', 'Април', 'Май'],
    datasets: [
      {
        label: 'Пожари', 
        data: [5, 7, 3, 6, 4], 
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
      },
      {
        label: 'Пътни инциденти', 
        data: [8, 6, 9, 10, 7], 
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
      }
    ]
  },
  options: {
    responsive: true, 
    plugins: {
      title: {
        display: true, 
        text: 'Произшествия по месеци' 
      }
    },
    scales: {
      y: {
        beginAtZero: true 
      }
    }
  }
});