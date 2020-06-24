<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <br>
                    <h1 class="card-title">Trade or View your Portfolio</h1>
                    <p class="card-text">You may Save & Load your Data.</p>
                    <p class="card-text">Click on 'End Day' to begin a new day!</p>
                    <br>
                    <hr>
                    <h4>Your Funds: {{getFunds}}$</h4>
                </div>
            </div>   
        </div>    
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'getFunds'
            ])
        }
    }
</script>

<style>

</style>
