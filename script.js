// Initialize the chart
const ctx = document.getElementById('bmiChart').getContext('2d');
let bmiChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['BMI'],
        datasets: [{
            label: 'BMI Rate',
            data: [0],
            backgroundColor: 'grey',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 40
            }
        }
    }
});

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    const bmi = weight / (height * height);
    const bmiResult = document.getElementById('bmi-result');
    const bmiStatus = document.getElementById('bmi-status');

    if (!isNaN(bmi)) {
        bmiResult.textContent = bmi.toFixed(2);
        let status = '';

        if (bmi < 18.5) {
            status = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            status = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            status = 'Overweight';
        } else {
            status = 'Obese';
        }

        bmiStatus.textContent = status;
        updateChart(bmi);
        speakStatus(status);
    } else {
        bmiResult.textContent = '0';
        bmiStatus.textContent = 'Unknown';
        updateChart(0);
        speakStatus('Unknown');
    }
}

function updateChart(bmi) {
    bmiChart.data.datasets[0].data = [bmi];
    bmiChart.data.datasets[0].backgroundColor = (bmi < 18.5) ? 'blue' :
                                              (bmi < 24.9) ? 'green' :
                                              (bmi < 29.9) ? 'orange' : 'red';
    bmiChart.update();
}

function speakStatus(status) {
    const utterance = new SpeechSynthesisUtterance(`Your BMI is ${document.getElementById('bmi-result').textContent} and your status is ${status}.`);
    speechSynthesis.speak(utterance);
}

// Add event listener for the button
document.getElementById('calculate-btn').addEventListener('click', calculateBMI);
