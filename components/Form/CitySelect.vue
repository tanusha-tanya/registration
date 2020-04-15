<template>
    <div class="input-item__input-wrapper">
        <label for="city" class="input-item__label">
          Город
        </label>
        <div class="city-autocompleet">
            <input
                class="input-item__input"
                id="city"       
                type="text"          
                @input="inputHandler($event.target.value)"
            />             
            <transition name="bounce">       
                <span class="autocomplete" v-if="cityObj.length > 0">            
                    <ul>
                        <li v-for="city of cityObj" :key="city.id">
                            <a href="#"
                                :data-id="city.id" 
                                @click.prevent="setValue(city.id,city.name)"
                            >{{city.name}}</a>
                        </li>
                    </ul>
                </span> 
            </transition>         
        </div>
    </div>
</template>
<script>
export default {
    name: 'CitySelect',    
    mounted(){
        if (this.$store.getters['cities/cities'].length === 0){             
            try{  
                this.$store.dispatch('cities/fetch')
            }
            catch(e){                  
                 console.log(e); 
            }
        }        
        document.body.addEventListener('click', this.closeByClick, false);
        document.addEventListener('keydown', this.closeByEscape, false);
    },
    destroyed(){
        document.removeEventListener('keydown', this.closeByEscape, false);
        document.body.removeEventListener('click', this.closeByClick, false);         
    },   
    computed:{
        cities(){
            return this.$store.getters['cities/cities']
        }
    },
    data(){
        return{
            city: null,
            cityObj:[]
        }      
    },
    methods:{
        debounce(func, wait, immediate) {
            var timeout;      
            return function executedFunction() {
                var context = this;
                var args = arguments;          
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;      
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);      
                if (callNow) func.apply(context, args);
            }
        },
        inputHandler(value){       
            this.debounce(this.autocomplete(value), 3000, false)
        },     
        autocomplete(value){           
            let count = 0 
            this.cityObj = [];   
            this.setValue(null);          
            this.cities.forEach(currentCity =>{                
                if(value.length > 2){                            
                    if(currentCity.name.toLowerCase().indexOf(value.toLowerCase()) != -1){
                        if(currentCity.name.toLowerCase() == value.toLowerCase()){
                            this.cityObj = [];   
                            this.setValue(currentCity.id); 
                            return count++   
                        }
                        else{
                            this.cityObj.push(currentCity) 
                            return count++ 
                        }                        
                    }                   
                }                                                              
            })       
            if(count <= 0){
                this.cityObj = []; 
                this.setValue(null)
            }
        },
        setValue(id, name){
            this.cityObj = []; 
            if(name){
                document.querySelector('#city').value = name;
            }           
            this.$emit('setValue', id)
        },
        closeByClick(event){
            if (!event.target.classList.contains('city-autocompleet') &&
                !event.target.closest('.city-autocompleet')){
                this.cityObj = [];                 
            }
        },
        closeByEscape(event){
            if(event.key === "Escape") {
                this.cityObj = [];                 
            }
        }     
    }
}
</script>
<style lang="scss">
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    .city-autocompleet{
        position: relative;
    }
    .autocomplete{
      width: 100%;
      position: absolute;
      max-height: 200px;
      overflow: auto; 
      margin-bottom: 30px;
      ul{              
        box-sizing: border-box;
      }      
      li{
        padding: 10px;
        background: #EAEAEA;
        transition: background .3s; 
        &:hover{
          background: #FFF; 
        }
      }
    }
</style>