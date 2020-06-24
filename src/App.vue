<template>
    <div class="container">
        <br>
        <app-header></app-header>
        <br>
        <transition name="slide-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Header from './components/Header';
    import { mapActions } from 'vuex'; 
    export default {
        components: {
            'app-header': Header
        },
        methods: {
            ...mapActions([
                'loadState'
            ])
        },
        created: function() {
            /* this.loadStockList(); */
            this.loadState();
        }
    }
</script>

<style>
    .slide-fade-enter-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
    }
</style>
