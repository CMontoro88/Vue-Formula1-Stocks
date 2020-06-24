<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Stock Trader</router-link>
        <!-- <a class="navbar-brand">Stock Trader</a> -->
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/stocks">Stocks</router-link>
            </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" role="button" @click="nextDay()">
                    End Day
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Save & Load
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" role="button" @click="cheatSaveState()">Save Data</a>
                    <a class="dropdown-item" role="button" @click="cheatLoadState()">Load Data</a>
                </div>
            </li>
        </ul>
        <span class="navbar-text mx-sm-3">
            <strong>Funds: {{getFunds}}$</strong>
        </span>
    </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'getFunds'
            ])
        },
        methods: {
            ...mapActions([
                    'randomizePrices',
                    'saveState',
                    'cheatLoadState',
                    'cheatSaveState'
                ]),
            nextDay: function() {
                this.randomizePrices();
                this.saveState();
            }
        }
    }
</script>

<style >
    .dropdown-item:active{
        color: transparent; 
        text-decoration: none;
        background-color: transparent;
    }
</style>
