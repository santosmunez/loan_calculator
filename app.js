// Listen for submits
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide results
  document.getElementById('results').style.display = 'none'

  // show loading
  document.getElementById('loading').style.display = 'block'

  setTimeout(calculateResults,2000)

  e.preventDefault()
})

// calculate Results
function calculateResults() {
  console.log('Calculating.....')
   

  // UI variables
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')

  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12
  
  
  // compute monthly payment
  
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  console.log('value of x is ' + x)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results
  document.getElementById('results').style.display = 'block';

    // hide loader
  document.getElementById('loading').style.display = 'none'

  } else {
    showError('please check the number!')
  }

  
}

function showError(error) {
    // show results
    document.getElementById('results').style.display = 'none';

    // hide loader
  document.getElementById('loading').style.display = 'none'

  // create  element
  const errorDiv = document.createElement('div')

  // add className to errorDiv
  errorDiv.className = 'alert alert-danger'

  // create textNode and append it
  errorDiv.appendChild(document.createTextNode(error))

  // get elements
  const heading = document.querySelector('.heading')
  const card = document.querySelector('.card')

  // insert error before heading
  card.insertBefore(errorDiv,heading)

  // clear error after 4 seconds
  setTimeout(clearError,4000)
}

function clearError() {
  document.querySelector('.alert').remove()
}
