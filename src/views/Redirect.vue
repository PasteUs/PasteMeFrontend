<script>
    export default {
        name: "Redirect",
        mounted() {
            this.$router.push(location.search.substr(1, location.search.length - 1));
        }
    }
</script>
