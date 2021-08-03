var windowX = screen.width;
var windowY = screen.height; 

class Bit 
{
    constructor()
    {
        this.x = (Math.random() * windowX - 5) - windowX / 2;
        this.y = (Math.random() * windowY - 5) - windowY / 2;
        this.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
        this.size = 5;
    }

    bDraw()
    {
        fill(this.color); 
        //specularMaterial(1000);
        //translate(-25, 0, 0);
        //shininess(1);
        push(); // saves current drawing position (0,0)
        translate(this.x, this.y, 0); // sets position of new sphere before drawing
        sphere(this.size);
        pop(); // restores current drawing position after translating. 
    }

    predated() // if the character is over the bit, the character 'eats' the bit. Which in turn needs to produce a new bit. 
    { 
        if(this.x < (cX + cSize/2) && this.x > (cX - cSize/2))
        {
            if (this.y < (cY + cSize/2) && this.y > cY - cSize/2)
            {
                if(cSize > this.size)
                {
                    //reset bit
                    this.x = (Math.random() * windowX - 5) - windowX / 2;
                    this.y = (Math.random() * windowY - 5) - windowY / 2;
                    this.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
                    //grow character size
                    cSize = cSize + .1 * this.size; 

                    if(this instanceof Enemy)
                    {
                        this.size = this.size = Math.random() * 24 + 6;
                    }
                }
            }
        }
    }
    
}

//bits
bitList = []; 
while(bitList.length <= 100) 
{
    bit = new Bit; 
    bitList.push(bit); 
}


class Enemy extends Bit
{
    constructor()
    {
        super(); 
        this.size = Math.random() * 24 + 6; 
        this.position = Math.random() * 3.14; 
        this.speed = .2 * Math.random(); 
        this.sight = 5; // how far can this enemy see???
    }
    movement()
    {
        //test if npc is close to player 
        if(Math.sqrt(Math.pow(cX - this.x, 2) + Math.pow(cY - this.y, 2)) < (this.size * this.sight))
        {
            
            if(this.size > cSize) //if bigger than player, pursue
            {
                if(cX - this.x > 0) //  If greater than increase, it means that character has greater value 
                {
                    this.x = this.x + this.speed; 
                }
                else 
                {
                    this.x = this.x - this.speed; 
                }

                if(cY - this.y > 0)  
                {
                    this.y = this.y + this.speed; 
                }
                else 
                {
                    this.y = this.y - this.speed; 
                }
                
            }
            else // run away from player
            {
                if(cX - this.x > 0) //  If greater than, then decrease. it means that character has greater value
                {
                    this.x = this.x - this.speed; 
                }
                else 
                {
                    this.x = this.x + this.speed; 
                }

                if(cY - this.y > 0)  
                {
                    this.y = this.y - this.speed; 
                }
                else 
                {
                    this.y = this.y + this.speed; 
                }
            }
            
        }
        else // if enemy is not close to player, check if close to enemy and if not enemies bits
        {
            // find closest npc to current npc

            let q = 0;
            let closestNPC = 0; 
            let currentDist = 1000000; // the current lowest distanced npc 
            let tempDist = 0; 
            while(q < enemyList.length) 
            {
                if(this !== enemyList[q])
                {
                    tempDist = Math.sqrt(Math.pow(enemyList[q].x - this.x, 2) + Math.pow(enemyList[q].y - this.y, 2)); // distance to current tested NPC
                    if(currentDist > tempDist)
                    {
                        currentDist = tempDist; 
                        closestNPC = q; 
                    }
                }
                q += 1;  
            }

            //check if closest npc is within sight. 
            if(currentDist < (this.size * this.sight))
            {
                if(enemyList[closestNPC].size < this.size) // if self larger than closest npc, attempt consumption
                {
                    if(enemyList[closestNPC].x - this.x > 0) //  If greater than increase, it means that npc q has greater value 
                    {
                        this.x = this.x + this.speed; 
                    }
                    else 
                    {
                        this.x = this.x - this.speed; 
                    }

                    if(enemyList[closestNPC].y - this.y > 0) 
                    {
                        this.y = this.y + this.speed; 
                    }
                    else 
                    {
                        this.y = this.y - this.speed; 
                    }
                }
                else //if closest npc is larger than self, run away from said npc
                {
                    if(enemyList[closestNPC].x - this.x > 0) //  If greater than, then decrease. it means that npc q has greater value
                    {
                        this.x = this.x - this.speed; 
                    }
                    else 
                    {
                        this.x = this.x + this.speed; 
                    }

                    if(enemyList[closestNPC].y - this.y > 0)  
                    {
                        this.y = this.y - this.speed; 
                    }
                    else 
                    {
                        this.y = this.y + this.speed; 
                    }
                }
            }
            else // check the closest bit and pursue it
            {

                //find closest bit
                q = 0;
                let closestBit = 0; 
                currentDist = 1000000; // the current lowest distanced npc 
                tempDist = 0; 
                while(q < bitList.length) 
                {
                    if(this !== bitList[q])
                    {
                        tempDist = Math.sqrt(Math.pow(bitList[q].x - this.x, 2) + Math.pow(bitList[q].y - this.y, 2)); // distance to current tested NPC
                        if(currentDist > tempDist)
                        {
                            currentDist = tempDist; 
                            closestBit = q; 
                        }
                    }
                    q += 1;  
                }

                //pursue closest bit
                if(bitList[closestBit].x - this.x > 0) //  If greater than increase, it means that npc q has greater value 
                {
                    this.x = this.x + this.speed; 
                }
                else 
                {
                    this.x = this.x - this.speed; 
                }

                if(bitList[closestBit].y - this.y > 0) 
                {
                    this.y = this.y + this.speed; 
                }
                else 
                {
                    this.y = this.y - this.speed; 
                }
            }
        }    
    }
    consume()
    {
        let i = 0; 
        //bits
        while (i < bitList.length)
        {
            if(this.x - this.size/2 < bitList[i].x && this.x + this.size/2 > bitList[i].x)
            {
                if(this.y - this.size/2 < bitList[i].y && this.y + this.size/2 > bitList[i].y)
                {
                     //reset bit
                     bitList[i].x = (Math.random() * windowX - 5) - windowX / 2;
                     bitList[i].y = (Math.random() * windowY - 5) - windowY / 2;
                     bitList[i].color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
                     //grow character size
                     this.size = this.size + bitList[i].size * .3;
                }
            }
            i += 1; 
        }

        //enemy
        i = 0;
        while (i < enemyList.length)
        {
            if(this !== enemyList[i])
            {
                if(this.x - this.size/2 < enemyList[i].x && this.x + this.size/2 > enemyList[i].x)
                {
                    if(this.y - this.size/2 < enemyList[i].y && this.y + this.size/2 > enemyList[i].y)
                    {
                        //reset bit
                        enemyList[i].x = (Math.random() * windowX - 5) - windowX / 2;
                        enemyList[i].y = (Math.random() * windowY - 5) - windowY / 2;
                        enemyList[i].color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
                        //grow character size
                        this.size = this.size + enemyList[i].size * .3;
                    }
                }
            } 
            
            i += 1; 
        }
        //eat character
        if(this.x - this.size/2 < cX && this.x + this.size/2 > cX)
        {
            if(this.y - this.size/2 < cY && this.y + this.size/2 > cY)
            {
                if(this.size > cSize)
                {
                    cSize = 6; 
                    this.size += cSize * .2; 
                }
            }
        }
    }
}

enemyList = []; 
let j = 0; 
while(enemyList.length < 10) 
{
    enemy = new Enemy; 
    j += 1; 
    enemyList.push(enemy);

}




// Main P5 Drawing Environment
function setup()
{
    createCanvas(windowWidth, windowHeight, WEBGL); 
}

//character vars
var cX = 0; 
var cY = 0;
var cSize = 15; 
var cColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
var cSpeed = 10;

//set window scroll
//var elmnt = document.getElementById('main');
//elmnt.scrollLeft = 0;
//elmnt.scrollTop = windowY/2; 

//draw all objects
function draw()
{
    background(255, 255, 240); 
    

    //shininess for gems
    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    ambientLight(250,250,250);
    pointLight(250, 250, 250, locX, locY, 50);
    
    //Character
    strokeWeight(0);
    fill(cColor); //color
    mX = mouseX - windowX/2;
    mY = mouseY - windowY/2;
    //character movement 
    if(mX + cX > cX + 5)
    {
        cX = cX + cSpeed / cSize; 
    }
    else 
    {
        if(mX + cX < cX - 5)
        {
            cX = cX - cSpeed / cSize;
        }
        
    }

    if(mY + cY > cY + 5)
    {
        cY = cY + cSpeed / cSize; 
    }
    else 
    {
        if(mY + cY < cY - 5)
        {
            cY = cY - cSpeed / cSize;
        }
        
    }
    
    

    //draw
    push();
    translate(cX, cY, 0); 
    sphere(cSize); 
    pop();
    
    //camera
    
    camera(cX, cY, 1000, cX, cY, 0);

    //bits 
    let i = 0; 

    while (i < bitList.length)
    {
        bitList[i].predated();
        bitList[i].bDraw();
        i = i + 1;
        
    }
    // enemies
    i = 0;  
    while (i < enemyList.length)
    {
        
        enemyList[i].predated();
        enemyList[i].bDraw();
        enemyList[i].movement();
        enemyList[i].consume();
        i = i + 1;
    }


}
