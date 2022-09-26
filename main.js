const card = document.querySelector('.card');
const addForm = document.querySelector('#add-form');
const btnSend = document.querySelector('.btn-send');
const inputId = document.querySelector('.input-id');
const errorInput = document.querySelector('.error-input');


const baseURL = 'https://pokeapi.co/api/v2/';


const searchCard = async e => {
  e.preventDefault();
  const valueInput = inputId.value.trim();
  inputId.value = '';

  if (!valueInput.length) return errorInput.innerHTML = `<small>Ingresar ID para buscar</small>` ;
  if (valueInput == 0) {
      errorInput.innerHTML = `<small>El ID debe ser distinto de cero</small>` ;
      
      return ;
  } else if(Math.sign(valueInput)=== -1){
      errorInput.innerHTML = `<small>El ID ingresado no puede ser negativo</small>` ;
      
      return; 
  } else{
    errorInput.innerHTML =" ";
  }

  const fetchedCard = await getPokemon(valueInput);
  if (!fetchedCard.id) {
    card.innerHTML = `<div class="error-card">
                        <small>No existe la Carta Pokemon</small>
                      </div>` ;
    form.reset();
    return;
  }else{
  // console.log(fetchedCard)

  card.innerHTML = `
  <div class="card-container">
  <div class="card-img">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${fetchedCard.id}.png" alt="${fetchedCard.name}">
  </div>
  <div class="card-info-stats">
      <span><i class="fas fa-bolt"></i>${fetchedCard.stats[1].base_stat} K</span>
      <span><i class="fas fa-shield"></i>${fetchedCard.stats[2].base_stat} K</span>
      <span><i class="fas fa-fist-raised"></i>${fetchedCard.base_experience} EXP</span>
  </div>
  <div class="card-info">
      <span><i class="fa-solid fa-up-down"></i>${(fetchedCard.height)/10} mts</span>
      <span><i class="fa-solid fa-weight-hanging"></i>${(fetchedCard.weight)/10} Kg</span>
      <span></span>
  </div>
  <div class="card-profile">
      <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${fetchedCard.id}.svg"
      alt="people"
      />
      <div class="card-profile-text">
          <h2 class="title-profile">${fetchedCard.name}</h2>
          <p class="p-profile"> ${fetchedCard.types[0].type.name} </p>
      </div>
  </div>
</div>
    `;

  card.classList.remove('bg')
  
  card.classList.add('flip-in-ver-right')
  setTimeout(()=>card.classList.remove('flip-in-ver-right'),500)
   
  }
}



const getPokemon = async (id) => {
    try {
      // Hacemos el fetch de la url
      const res = await fetch(`${baseURL}pokemon/${id}`);
  
      // Transformar esa respuesta en un json
      const data = await res.json();
      return data;

    } catch (error) {
      // console.log(error)
      card.classList.add('flip-in-ver-right')
      card.innerHTML = `<div class="error-card">
                        <small>No existe la Carta Pokemon</small>
                      </div>`
      card.classList.add('bg')
      setTimeout(()=>card.classList.remove('flip-in-ver-right'),500)
    }
  };
  

  const init = () => {
    setTimeout(()=>card.classList.remove('flip-in-ver-right'),500)
    addForm.addEventListener('submit', searchCard);
    
};

init();