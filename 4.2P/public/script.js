const api = '/api/records';

async function fetchRecords() {
  const res = await fetch(api);
  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  data.forEach(r => {
    const li = document.createElement('li');
    li.innerHTML = `${r.fullName} (${r.rollNo}) - ${r.course} Year ${r.year} CGPA: ${r.cgpa || '-' } 
    <button data-id="${r._id}" class="del">Delete</button>`;
    list.appendChild(li);
  });
}

document.getElementById('recForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    fullName: document.getElementById('fullName').value,
    rollNo: document.getElementById('rollNo').value,
    course: document.getElementById('course').value,
    year: Number(document.getElementById('year').value),
    cgpa: parseFloat(document.getElementById('cgpa').value) || null
  };
  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  e.target.reset();
  fetchRecords();
});

document.getElementById('list').addEventListener('click', async (e) => {
  if (e.target.classList.contains('del')) {
    const id = e.target.dataset.id;
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    fetchRecords();
  }
});

fetchRecords();
