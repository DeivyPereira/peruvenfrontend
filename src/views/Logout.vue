<template>
    <div>
        
    </div>
</template>

<script>
export default {
    created(){
        localStorage.removeItem( 'country' )
        localStorage.removeItem( 'role' )
        localStorage.removeItem( 'token' )
        localStorage.removeItem( 'session' )
        this.$router.push( '/' )
    }
}
</script>