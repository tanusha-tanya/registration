<template>    
    <div class="alert">
        <div class="alert-head">
            {{title}}
        </div>
        <div class="alert-content" v-html="content">           
        </div>
        <a href="#" class="alert-close" @click.prevent="close">  Закрыть</a>
   </div>
</template>

<script>
    export default {
        name: 'Myalert',
        props: {       
            title: String,
            content: String,
            link: String,            
        },
        methods:{
            close(){
                this.$emit('close')
            },           
           closeAlertByEscape(event){
                if(event.key === "Escape" || event.key === "Enter") {            
                   this.close()                   
                }                 
            }    
        },
        mounted(){
            let alertWrapper = document.createElement('div');
            alertWrapper.className = 'alertwrapper';           
            alertWrapper.style.height=document.body.clientHeight + "px";
            document.body.append(alertWrapper);
            alertWrapper.addEventListener('click', this.close, false);  
            document.addEventListener('keydown', this.closeAlertByEscape, false);       
        },   
        destroyed(){
            let alertWrapper = document.querySelector('.alertwrapper');
            alertWrapper.remove();    
            document.removeEventListener('keydown', this.closeAlertByEscape, false);        
        }   
    }
</script> 
<style lang="scss">
@import '@/styles/variables.scss';
    .alert{
        top: 80px;
        width: 280px; 
        left: calc(50% - 140px);  
        background: #ffffff;
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 16px 24px rgba(0, 0, 0, 0.14);
        border-radius: 4px;
        overflow: auto;
        position: fixed;
        border-radius: 4px;
        z-index: 800;
        @media (min-width: $tablet) {
            margin: 80px auto;            
            width: 400px;
            left: calc(50% - 200px);  
        }
        &-head{
           background: linear-gradient(0deg, rgba(53, 170, 103, 0.1), rgba(53, 170, 103, 0.1)), #FFFFFF;
           padding: 16px;
           color: #1E1F23;
           letter-spacing: 0.0015em;
           text-align: center;
           font-weight: 500;
           font-size: 16px;
           line-height: 24px;
           font-family: 'Roboto', sans-serif;  
        }  
        &-content{
            margin: 24px;
            text-align: center; 
            p{
                font-size: 14px;
                line-height: 20px;                 
            }
            a{
                color: #5461DC;
                font-size: 14px;
                line-height: 20px;
            }
        }
        &-close{
            padding: 16px;
            border-top:1px solid #EAEAEA;
            letter-spacing: 0.75px;
            color: #616161;
            font-size: 14px;
            line-height: 16px;
            text-transform: uppercase;
            display: block;
            text-align: center;
        }    
    }
    .alertwrapper{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        bottom: 0;
        left: 0;
        right:0;
        background:#000000;
        opacity: 0.32;
        z-index: 500;
    }
</style>