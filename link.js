class Link{
    constructor(b1,b2){
        this.link = Constraint.create({
            bodyA:b1.body.bodies[b1.body.bodies.length-1],
            bodyB:b2,
            length:0,
            stiffness:0.1
        })
        World.add(world,this.link)
    }
    remove(){
        World.remove(world,this.link)
    }
} 