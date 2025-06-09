// Get the canvas element for the chart
const ctx = document.getElementById('incidentChart').getContext('2d');

// Create the bar chart
const incidentChart = new Chart(ctx, {
  type: 'bar', // Type of chart: bar chart
  data: {
    // Labels for the X-axis (months)
    labels: ['Януари', 'Февруари', 'Март', 'Април', 'Май'],
    datasets: [
      {
        label: 'Пожари', // Label for the first dataset (Fires)
        data: [5, 7, 3, 6, 4], // Data for fires per month
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Background color for fire bars
      },
      {
        label: 'Пътни инциденти', // Label for the second dataset (Road Incidents)
        data: [8, 6, 9, 10, 7], // Data for road incidents per month
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Background color for road incident bars
      }
    ]
  },
  options: {
    responsive: true, // Make the chart responsive to container size
    plugins: {
      title: {
        display: true, // Display the chart title
        text: 'Произшествия по месеци' // Chart title text
      }
    },
    scales: {
      y: {
        beginAtZero: true // Start the Y-axis from zero
      }
    }
  }
});