module.exports = function timestamp(schema){
    schema.add({
        createdAt : Date,
        updatedaAt : Date
    })

    schema.pre('save', function(next){
        let now = Date.now();
        this.updatedaAt = now;

        if(!this.createdAt){
            this.createdAt = now;
        }

        next();

    })

}