from PIL import Image
from IPython.display import display
import random
import json
skin_name = '1'
skin_count = 9999
char_id = '1'
background = ["Background 1083","Background 2222","Background 231","Background 234","Background 2341","Background 2373","Background 2432","Background 29","Background 3452","Background 3762","Background 4012","Background 4092","Background 421","Background 46","Background 489","Background 4892","Background 493","Background 54","Background 564","Background 573","Background 5934","Background 62","Background 652","Background 653","Background 6733","Background 675","Background 6891","Background 69","Background 701","Background 74","Background 76","Background 762","Background 765","Background 7682","Background 78","Background 785","Background 789","Background 7984","Background 82","Background 8701","Background 871","Background 872","Background 874","Background 891","Background 8931","Background 9021","Background 9281","Background 982","Background 9821","Background 999","Backgroun 4321","Background 12","Background 21","Background 23","Background 2564","Background 2809","Background 3573","Background 371","Background 382","Background 45","Background 453","Background 476","Background 482","Background 492","Background 5642","Background 5691","Background 57","Background 591","Background 783","Background 8393","Background 875","Background 92","Background 928","Background 9381","Background 948"]
background_weights = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
background_files = {"Background 1083":"1-background 1083","Background 2222":"1-background 2222","Background 231":"1-background 231","Background 234":"1-background 234","Background 2341":"1-background 2341","Background 2373":"1-background 2373","Background 2432":"1-background 2432","Background 29":"1-background 29","Background 3452":"1-background 3452","Background 3762":"1-background 3762","Background 4012":"1-background 4012","Background 4092":"1-background 4092","Background 421":"1-background 421","Background 46":"1-background 46","Background 489":"1-background 489","Background 4892":"1-background 4892","Background 493":"1-background 493","Background 54":"1-background 54","Background 564":"1-background 564","Background 573":"1-background 573","Background 5934":"1-background 5934","Background 62":"1-background 62","Background 652":"1-background 652","Background 653":"1-background 653","Background 6733":"1-background 6733","Background 675":"1-background 675","Background 6891":"1-background 6891","Background 69":"1-background 69","Background 701":"1-background 701","Background 74":"1-background 74","Background 76":"1-background 76","Background 762":"1-background 762","Background 765":"1-background 765","Background 7682":"1-background 7682","Background 78":"1-background 78","Background 785":"1-background 785","Background 789":"1-background 789","Background 7984":"1-background 7984","Background 82":"1-background 82","Background 8701":"1-background 8701","Background 871":"1-background 871","Background 872":"1-background 872","Background 874":"1-background 874","Background 891":"1-background 891","Background 8931":"1-background 8931","Background 9021":"1-background 9021","Background 9281":"1-background 9281","Background 982":"1-background 982","Background 9821":"1-background 9821","Background 999":"1-background 999","Backgroun 4321":"2-backgroun 4321","Background 12":"2-background 12","Background 21":"2-background 21","Background 23":"2-background 23","Background 2564":"2-background 2564","Background 2809":"2-background 2809","Background 3573":"2-background 3573","Background 371":"2-background 371","Background 382":"2-background 382","Background 45":"2-background 45","Background 453":"2-background 453","Background 476":"2-background 476","Background 482":"2-background 482","Background 492":"2-background 492","Background 5642":"2-background 5642","Background 5691":"2-background 5691","Background 57":"2-background 57","Background 591":"2-background 591","Background 783":"2-background 783","Background 8393":"2-background 8393","Background 875":"2-background 875","Background 92":"2-background 92","Background 928":"2-background 928","Background 9381":"2-background 9381","Background 948":"2-background 948"}
accessory = ["20","Small Solana","Dollar Solana","NFT","Blue Lightning","Question Mark","Round","Blue Diamond","Yellow Laser","Blue Ring Laser","Ring","Yellow Long Earrings","Piece Of Wood","Rings","Zzz","Three Rings","Bandage","Chain","Circle","Fisher","Red Laser","Staple","Diamond","Claw","Ring Beads","None"]
accessory_weights = [0,0.05,0.1,0.1,0.1,0.1,0.1,0.2,0.25,0.3,0.3,0.33,0.4,0.4,0.44,0.45,0.5,0.5,1,1,1,1,2,2,2,85.38]
accessory_files = {"20":"0.-20-Solana Big","Small Solana":"0.05-Small Solana","Dollar Solana":"0.10-Dollar Solana","NFT":"0.10-NFT","Blue Lightning":"0.10-blue Lightning","Question Mark":"0.10-question mark","Round":"0.10-round","Blue Diamond":"0.20-blue diamond","Yellow Laser":"0.25-yellow laser","Blue Ring Laser":"0.30-blue ring laser","Ring":"0.30-ring","Yellow Long Earrings":"0.33-yellow long earrings","Piece Of Wood":"0.40-piece of wood","Rings":"0.40-rings","Zzz":"0.44-Zzz","Three Rings":"0.45-three rings","Bandage":"0.50-bandage","Chain":"0.50-chain","Circle":"1-circle","Fisher":"1-fisher","Red Laser":"1-red laser","Staple":"1-staple","Diamond":"2-Diamond","Claw":"2-claw","Ring Beads":"2-ring beads","None":"none"}
skin = ["Character #1","Character #2","Character #3"]
skin_weights = [10,40,50]
skin_files = {"Character #1":"10-Character #1","Character #2":"40-Character #2","Character #3":"50-Character #3"}
body = ["Sol Blue T","Sol Yellow T","Bandage","Bloody White T","Blue Jacket","Blue Sweater","Button Green Jacket","Claw","Dirty Blue Jacket","Dirty Jacket","Dirty Tuxedo","Footballer","Gardener Jeans","Gardener Outfit","Hanging","Injured Gray Dress","Long Sleeve Red","Long Sleeve Straight","Military","Open Lungs","Plain Bloody Yellow Dress","Police Uniform","Purple Jacket","Red Ripped Dress","White Injured T","Blood Tie","Bloody T","Bloody Traditional","Bloody White Shirt","Clean Coat","Dirty Leather Jacket","Green Bloody Jacket","Hoodie","Outdoor Dress","Protective Suit","Purple Stripes","Striped Blue White","Striped Diary","Thick Coat","White Buttoned","Bloody Shirt","Clean Short Sleeve","Torn Casual","Bloodstained","Bloody Yellow","Dirty Gray","Plain Green","Torn Diary","White Short Sleeve","Classic Sweater","Yellow T"]
body_weights = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,4,4,4,4,4,4,5,7]
body_files = {"Sol Blue T":"1-Sol blue t-shirt","Sol Yellow T":"1-Sol yellow t-shirt","Bandage":"1-bandage","Bloody White T":"1-bloody white t-shirt","Blue Jacket":"1-blue jacket","Blue Sweater":"1-blue sweater","Button Green Jacket":"1-button green jacket","Claw":"1-claw","Dirty Blue Jacket":"1-dirty blue jacket","Dirty Jacket":"1-dirty jacket","Dirty Tuxedo":"1-dirty tuxedo","Footballer":"1-footballer","Gardener Jeans":"1-gardener jeans","Gardener Outfit":"1-gardener outfit","Hanging":"1-hanging","Injured Gray Dress":"1-injured gray dress","Long Sleeve Red":"1-long sleeve red","Long Sleeve Straight":"1-long sleeve straight","Military":"1-military","Open Lungs":"1-open lungs","Plain Bloody Yellow Dress":"1-plain bloody yellow dress","Police Uniform":"1-police uniform","Purple Jacket":"1-purple jacket","Red Ripped Dress":"1-red ripped dress","White Injured T":"1-white injured t-shirt","Blood Tie":"2-blood tie","Bloody T":"2-bloody t-shirt","Bloody Traditional":"2-bloody traditional","Bloody White Shirt":"2-bloody white shirt","Clean Coat":"2-clean coat","Dirty Leather Jacket":"2-dirty leather jacket","Green Bloody Jacket":"2-green bloody jacket","Hoodie":"2-hoodie","Outdoor Dress":"2-outdoor dress","Protective Suit":"2-protective suit","Purple Stripes":"2-purple stripes","Striped Blue White":"2-striped blue white","Striped Diary":"2-striped diary","Thick Coat":"2-thick coat","White Buttoned":"2-white buttoned","Bloody Shirt":"3-bloody shirt","Clean Short Sleeve":"3-clean short sleeve","Torn Casual":"3-torn casual","Bloodstained":"4-bloodstained","Bloody Yellow":"4-bloody yellow","Dirty Gray":"4-dirty gray","Plain Green":"4-plain green","Torn Diary":"4-torn diary","White Short Sleeve":"4-white short sleeve","Classic Sweater":"5-classic sweater","Yellow T":"7-yellow t-shirt"}
chin = ["Chin 1001","Chin 114","Chin 116","Chin 1621","Chin 1763","Chin 1789","Chin 1892","Chin 244","Chin 2691","Chin 27","Chin 280","Chin 281","Chin 291","Chin 372","Chin 3942","Chin 4892","Chin 54","Chin 5821","Chin 593","Chin 65","Chin 652","Chin 66","Chin 6701","Chin 69","Chin 7621","Chin 782","Chin 7893","Chin 796","Chin 821","Chin 8791","Chin 901","Chin 9281","Chin 98","Chin 982","Chin 165","Chin 1782","Chin 19","Chin 192","Chin 2891","Chin 2983","Chin 34","Chin 762","Chin 8912","Chin 132","Chin 143","Chin 23","Chin 382","Chin 43","Chin 45","Chin 453","Chin 492","Chin 543","Chin 763","Chin 781","Chin 88","Chin 178","Chin 28","Chin 872"]
chin_weights = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4]
chin_files = {"Chin 1001":"1-chin 1001","Chin 114":"1-chin 114","Chin 116":"1-chin 116","Chin 1621":"1-chin 1621","Chin 1763":"1-chin 1763","Chin 1789":"1-chin 1789","Chin 1892":"1-chin 1892","Chin 244":"1-chin 244","Chin 2691":"1-chin 2691","Chin 27":"1-chin 27","Chin 280":"1-chin 280","Chin 281":"1-chin 281","Chin 291":"1-chin 291","Chin 372":"1-chin 372","Chin 3942":"1-chin 3942","Chin 4892":"1-chin 4892","Chin 54":"1-chin 54","Chin 5821":"1-chin 5821","Chin 593":"1-chin 593","Chin 65":"1-chin 65","Chin 652":"1-chin 652","Chin 66":"1-chin 66","Chin 6701":"1-chin 6701","Chin 69":"1-chin 69","Chin 7621":"1-chin 7621","Chin 782":"1-chin 782","Chin 7893":"1-chin 7893","Chin 796":"1-chin 796","Chin 821":"1-chin 821","Chin 8791":"1-chin 8791","Chin 901":"1-chin 901","Chin 9281":"1-chin 9281","Chin 98":"1-chin 98","Chin 982":"1-chin 982","Chin 165":"2-chin 165","Chin 1782":"2-chin 1782","Chin 19":"2-chin 19","Chin 192":"2-chin 192","Chin 2891":"2-chin 2891","Chin 2983":"2-chin 2983","Chin 34":"2-chin 34","Chin 762":"2-chin 762","Chin 8912":"2-chin 8912","Chin 132":"3-chin 132","Chin 143":"3-chin 143","Chin 23":"3-chin 23","Chin 382":"3-chin 382","Chin 43":"3-chin 43","Chin 45":"3-chin 45","Chin 453":"3-chin 453","Chin 492":"3-chin 492","Chin 543":"3-chin 543","Chin 763":"3-chin 763","Chin 781":"3-chin 781","Chin 88":"3-chin 88","Chin 178":"4-chin 178","Chin 28":"4-chin 28","Chin 872":"4-chin 872"}
ear = ["Ear 23","Ear 281","Ear 2911","Ear 3421","Ear 3493","Ear 373","Ear 384","Ear 48","Ear 670","Ear 671","Ear 82","Ear 981","Ear 3891","Ear 4592","Ear 901","Ear 234","Ear 2391","Ear 2801","Ear 2891","Ear 5432","Ear 89","Ear 902","Ear 98","Ear 982","Ear 9821","Ear 132","Ear 211","Ear 34","Ear 342","Ear 345","Ear 3762","Ear 402","Ear 743","Ear 754","Ear 7832","Ear 292","Ear 6452"]
ear_weights = [1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,7,7]
ear_files = {"Ear 23":"1-Ear 23","Ear 281":"1-Ear 281","Ear 2911":"1-Ear 2911","Ear 3421":"1-Ear 3421","Ear 3493":"1-Ear 3493","Ear 373":"1-Ear 373","Ear 384":"1-Ear 384","Ear 48":"1-Ear 48","Ear 670":"1-Ear 670","Ear 671":"1-Ear 671","Ear 82":"1-Ear 82","Ear 981":"1-Ear 981","Ear 3891":"2-Ear 3891","Ear 4592":"2-Ear 4592","Ear 901":"2-Ear 901","Ear 234":"3-Ear 234","Ear 2391":"3-Ear 2391","Ear 2801":"3-Ear 2801","Ear 2891":"3-Ear 2891","Ear 5432":"3-Ear 5432","Ear 89":"3-Ear 89","Ear 902":"3-Ear 902","Ear 98":"3-Ear 98","Ear 982":"3-Ear 982","Ear 9821":"3-Ear 9821","Ear 132":"4-Ear 132","Ear 211":"4-Ear 211","Ear 34":"4-Ear 34","Ear 342":"4-Ear 342","Ear 345":"4-Ear 345","Ear 3762":"4-Ear 3762","Ear 402":"4-Ear 402","Ear 743":"4-Ear 743","Ear 754":"4-Ear 754","Ear 7832":"4-Ear 7832","Ear 292":"7-Ear 292","Ear 6452":"7-Ear 6452"}
face = ["Angry Purple Eye","Angry Red Eyes","Angry Red One Eye","Angry Yellow Eye","Black Discharge","Blue Stream","Bright Eye","Broken One Eye","Carefully","Damaged","Dark","Green Big One Eye","Hollow One Eye","One Eye Runny","Red Green Eye","Red Little Eyes","Rotten Purple Eye","Rotten Red","Smashed Red Eye","Stitched Green Eye","Veiny Eyes","Broken","Capillaries","Gray One Eye","Green Eyelid","Green Hazy","Misty Eyes","One Eye Slipped","Red Gray Eye","Red Line Angry","Red Smashed Eye","Rotten Purple Eyes","Runny Green Eye","Stitched Eye","Stitched Single Eye","Tired One Eye","Yellow Eye Angry","Yellow Piece","Yellow White Eye","Bruised Eye","Carved Eye","Crustacean Eye","Gray Dead Eye","Green One Eye","Smashed Eyelid","Striped Green","Two Hazy Eyes","Closed Eyelid","Demonic","Black","Green Runny Eye"]
face_weights = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,5,5]
face_files = {"Angry Purple Eye":"1-angry purple eye","Angry Red Eyes":"1-angry red eyes","Angry Red One Eye":"1-angry red one eye","Angry Yellow Eye":"1-angry yellow eye","Black Discharge":"1-black discharge","Blue Stream":"1-blue stream","Bright Eye":"1-bright eye","Broken One Eye":"1-broken one eye","Carefully":"1-carefully","Damaged":"1-damaged","Dark":"1-dark","Green Big One Eye":"1-green big one eye","Hollow One Eye":"1-hollow one eye","One Eye Runny":"1-one eye runny","Red Green Eye":"1-red green eye","Red Little Eyes":"1-red little eyes","Rotten Purple Eye":"1-rotten purple eye","Rotten Red":"1-rotten red","Smashed Red Eye":"1-smashed red eye","Stitched Green Eye":"1-stitched green eye","Veiny Eyes":"1-veiny eyes","Broken":"2-broken","Capillaries":"2-capillaries","Gray One Eye":"2-gray one eye","Green Eyelid":"2-green eyelid","Green Hazy":"2-green hazy","Misty Eyes":"2-misty eyes","One Eye Slipped":"2-one eye slipped","Red Gray Eye":"2-red gray eye","Red Line Angry":"2-red line angry","Red Smashed Eye":"2-red smashed eye","Rotten Purple Eyes":"2-rotten purple eyes","Runny Green Eye":"2-runny green eye","Stitched Eye":"2-stitched eye","Stitched Single Eye":"2-stitched single eye","Tired One Eye":"2-tired one eye","Yellow Eye Angry":"2-yellow eye angry","Yellow Piece":"2-yellow piece","Yellow White Eye":"2-yellow white eye","Bruised Eye":"3-bruised eye","Carved Eye":"3-carved eye","Crustacean Eye":"3-crustacean eye","Gray Dead Eye":"3-gray dead eye","Green One Eye":"3-green one eye","Smashed Eyelid":"3-smashed eyelid","Striped Green":"3-striped green","Two Hazy Eyes":"3-two hazy eyes","Closed Eyelid":"4-closed eyelid","Demonic":"4-demonic","Black":"5-Black","Green Runny Eye":"5-green runny eye"}
head = ["Helmet","Round Hat","Solana Bandana","Z","Bandaged","Blue Hair","Cleft Brain","Green Hair","Pierced Head","Pilot Hat","Red Brain","Slit","Split Head","Seamy","Bloody Hair","Classic Brown Hair","Cracked Head","Hair Bonnet","Long Blue Hair","Reverse Hat","Rotten Brain","Short Hair","White Hat","Bloody Brain","Metal","Black Brain","Black Short Hair","Bloody Hat","Blue Brain","Brain Muscle","Bulk Hair","Cool Blonde Hair","Fragmented Brain","Green Short Hair","Injured White Hair","Open Brain","Police Hat","Purple Brain","Vascular Brain","White Short Hair","Blonde Long Hair","Short Blonde Hair","Sports Hat","Short Dirty"]
head_weights = [1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,5]
head_files = {"Helmet":"1-Helmet","Round Hat":"1-Round Hat","Solana Bandana":"1-Solana bandana","Z":"1-Z","Bandaged":"1-bandaged","Blue Hair":"1-blue hair","Cleft Brain":"1-cleft brain","Green Hair":"1-green hair","Pierced Head":"1-pierced head","Pilot Hat":"1-pilot hat","Red Brain":"1-red brain","Slit":"1-slit","Split Head":"1-split head","Seamy":"2-Seamy","Bloody Hair":"2-bloody hair","Classic Brown Hair":"2-classic brown hair","Cracked Head":"2-cracked head","Hair Bonnet":"2-hair bonnet","Long Blue Hair":"2-long blue hair","Reverse Hat":"2-reverse hat","Rotten Brain":"2-rotten brain","Short Hair":"2-short Hair","White Hat":"2-white hat","Bloody Brain":"3-Bloody Brain","Metal":"3-Metal","Black Brain":"3-black brain","Black Short Hair":"3-black short hair","Bloody Hat":"3-bloody hat","Blue Brain":"3-blue brain","Brain Muscle":"3-brain muscle","Bulk Hair":"3-bulk hair","Cool Blonde Hair":"3-cool blonde hair","Fragmented Brain":"3-fragmented brain","Green Short Hair":"3-green short hair","Injured White Hair":"3-injured white hair","Open Brain":"3-open brain","Police Hat":"3-police hat","Purple Brain":"3-purple brain","Vascular Brain":"3-vascular brain","White Short Hair":"3-white short hair","Blonde Long Hair":"4-blonde long hair","Short Blonde Hair":"4-short blonde hair","Sports Hat":"4-sports hat","Short Dirty":"5-short dirty"}
neck = ["Solana","Blood","Bloody Wound 342","Bruised Wound","Hole","Incision","Knife","Open Wound 2321","Open Wound","Paw Trail","Tattoo 1345","Tattoo 2341","Tattoo 6532","Tattoo 981","Triangle Wound","Yellow Ring","Rotten Hole","Sewing Trail","None"]
neck_weights = [0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,80.5]
neck_files = {"Solana":"0.50-Solana","Blood":"1-blood","Bloody Wound 342":"1-bloody wound 342","Bruised Wound":"1-bruised wound","Hole":"1-hole","Incision":"1-incision","Knife":"1-knife","Open Wound 2321":"1-open wound 2321","Open Wound":"1-open wound","Paw Trail":"1-paw trail","Tattoo 1345":"1-tattoo 1345","Tattoo 2341":"1-tattoo 2341","Tattoo 6532":"1-tattoo 6532","Tattoo 981":"1-tattoo 981","Triangle Wound":"1-triangle wound","Yellow Ring":"1-yellow ring","Rotten Hole":"2-rotten hole","Sewing Trail":"2-sewing trail","None":"none"}
necklace = ["Solana 21","Zz","NFT 2123","Solana 22","Solana 54","Guitar","Ringlet","Triangle Necklace","Solana 421","Solana 45","Zzz","Green Diamond","Solana 332","Half Heart","Round Stone","NFT 432","Tag","Thick Rope","Lightning","Stone Necklace","Claw","Fish Litter","Golden Chain","Gray Necklace","Tag 3421","Collar","Green Open Wound","None"]
necklace_weights = [0.05,0.05,0.1,0.1,0.1,0.1,0.1,0.1,0.14,0.15,0.15,0.2,0.21,0.3,0.3,0.4,0.5,0.6,0.8,0.9,1,1,1,1,1,2,2,85.65]
necklace_files = {"Solana 21":"0.05-Solana 21","Zz":"0.05-Zz","NFT 2123":"0.10-NFT 2123","Solana 22":"0.10-Solana 22","Solana 54":"0.10-Solana 54","Guitar":"0.10-guitar","Ringlet":"0.10-ringlet","Triangle Necklace":"0.10-triangle necklace","Solana 421":"0.14-Solana 421","Solana 45":"0.15-Solana 45","Zzz":"0.15-Zzz","Green Diamond":"0.20-green diamond","Solana 332":"0.21-Solana 332","Half Heart":"0.30-half heart","Round Stone":"0.30-round stone","NFT 432":"0.40-NFT 432","Tag":"0.50-tag","Thick Rope":"0.60-thick rope","Lightning":"0.80-lightning","Stone Necklace":"0.90-stone necklace","Claw":"1-claw","Fish Litter":"1-fish litter","Golden Chain":"1-golden chain","Gray Necklace":"1-gray necklace","Tag 3421":"1-tag 3421","Collar":"2-collar","Green Open Wound":"2-green open wound","None":"none"}




## Generate Traits

TOTAL_IMAGES = skin_count # Number of random unique images we want to generate

all_images = []

# A recursive function to generate unique image combinations
def create_new_image():

    new_image = {} #

    # For each trait category, select a random trait based on the weightings
    new_image ["Background"] = random.choices(background, background_weights)[0]
    new_image ["Skin"] = random.choices(skin, skin_weights)[0]
    new_image ["Accessory"] = random.choices(accessory, accessory_weights)[0]
    new_image ["Body"] = random.choices(body, body_weights)[0]
    new_image ["Chin"] = random.choices(chin, chin_weights)[0]
    new_image ["Ear"] = random.choices(ear, ear_weights)[0]
    new_image ["Face"] = random.choices(face, face_weights)[0]
    new_image ["Head"] = random.choices(head, head_weights)[0]
    new_image ["Neck"] = random.choices(neck, neck_weights)[0]
    new_image ["Necklace"] = random.choices(necklace, necklace_weights)[0]
    if new_image in all_images:
        return create_new_image()
    else:
        return new_image


# Generate the unique combinations based on trait weightings
for i in range(TOTAL_IMAGES):

    new_trait_image = create_new_image()

    all_images.append(new_trait_image)

    # Returns true if all images are unique
def all_images_unique(all_images):
    seen = list()
    return not any(i in seen or seen.append(i) for i in all_images)

print("Are all images unique?", all_images_unique(all_images))
# Add token Id to each image
i = 0
for item in all_images:
    item["tokenId"] = i
    i = i + 1
# Get Trait Counts

background_count = {}
for item in background:
    background_count[item] = 0

skin_count = {}
for item in skin:
    skin_count[item] = 0

accessory_count = {}
for item in accessory:
    accessory_count[item] = 0

body_count = {}
for item in body:
    body_count[item] = 0

chin_count = {}
for item in chin:
    chin_count[item] = 0

ear_count = {}
for item in ear:
    ear_count[item] = 0

face_count = {}
for item in face:
    face_count[item] = 0

head_count = {}
for item in head:
    head_count[item] = 0

neck_count = {}
for item in neck:
    neck_count[item] = 0

necklace_count = {}
for item in necklace:
    necklace_count[item] = 0

for image in all_images:
    background_count[image["Background"]] += 1
    skin_count[image["Skin"]] += 1
    accessory_count[image["Accessory"]] += 1
    body_count[image["Body"]] += 1
    chin_count[image["Chin"]] += 1
    ear_count[image["Ear"]] += 1
    face_count[image["Face"]] += 1
    head_count[image["Head"]] += 1
    neck_count[image["Neck"]] += 1
    necklace_count[image["Necklace"]] += 1

#### Generate Metadata for all Traits
METADATA_FILE_NAME = './metadata/all-traits.json'
with open(METADATA_FILE_NAME, 'w') as outfile:
    json.dump(all_images, outfile, indent=4)


#### Generate Images
for item in all_images:

    im1 = Image.open(f'./trait-layers/{skin_name}/background/{background_files[item["Background"]]}.png').convert('RGBA')
    im2 = Image.open(f'./trait-layers/{skin_name}/skin/{skin_files[item["Skin"]]}.png').convert('RGBA')
    im3 = Image.open(f'./trait-layers/{skin_name}/accessory/{accessory_files[item["Accessory"]]}.png').convert('RGBA')
    im4 = Image.open(f'./trait-layers/{skin_name}/body/{body_files[item["Body"]]}.png').convert('RGBA')
    im5 = Image.open(f'./trait-layers/{skin_name}/chin/{chin_files[item["Chin"]]}.png').convert('RGBA')
    im6 = Image.open(f'./trait-layers/{skin_name}/ear/{ear_files[item["Ear"]]}.png').convert('RGBA')
    im7 = Image.open(f'./trait-layers/{skin_name}/face/{face_files[item["Face"]]}.png').convert('RGBA')
    im8 = Image.open(f'./trait-layers/{skin_name}/head/{head_files[item["Head"]]}.png').convert('RGBA')
    im9 = Image.open(f'./trait-layers/{skin_name}/neck/{neck_files[item["Neck"]]}.png').convert('RGBA')
    im10 = Image.open(f'./trait-layers/{skin_name}/necklace/{necklace_files[item["Necklace"]]}.png').convert('RGBA')

    #Create each composite
    com1 = Image.alpha_composite(im1, im2)
    com2 = Image.alpha_composite(com1, im4)
    com3 = Image.alpha_composite(com2, im5)
    com4 = Image.alpha_composite(com3, im6)
    com5 = Image.alpha_composite(com4, im7)
    com6 = Image.alpha_composite(com5, im8)
    com7 = Image.alpha_composite(com6, im9)
    com8 = Image.alpha_composite(com7, im10)
    com9 = Image.alpha_composite(com8, im3)

    #Convert to RGB
    rgb_im = com9.convert('RGBA')
    file_name = str(item["tokenId"]) + ".png"
    rgb_im.save("./out/" + file_name)
#### Generate Metadata for each Image

f = open('./metadata/all-traits.json',)
data = json.load(f)


PROJECT_NAME = "SOL ZOMBIE NFT"

def getAttribute(key, value):
    return {
        "trait_type": key,
        "value": value
    }
for i in data:
    token_id = i['tokenId']
    token = {
    	"name": PROJECT_NAME + ' #' + str(token_id),
    	"symbol": "SOLZ",
	  	"description": "The virus, which was produced with an error while performing an innocent scientific experiment, caused the end of humanity, and all humans disappeared.",
      	"seller_fee_basis_points": 0,
      	"external_url": "https://solzombie.com",
        "image": str(token_id) + '.png',
        "attributes": [],
		"collection": {
            "name": PROJECT_NAME,
            "family": "SOL ZOMBIE"
	  	},
		"properties": {
			"files": [{ "uri": str(token_id) + '.png', "type": "image/png" }],
			"category": "image",
			"creators": [
			{
			  "address": "ENy8xoWG82Nh9xcUAd6uVARUj4JsDVczhgMpGS39n2ow",
			  "share": 98
			},
			{
			  "address": "Aqt5uVvnXHdxiDSuRn594pAaFu2MmHDepTDBZTq7gLRc",
			  "share": 2
			}]
		}
    }
    token["attributes"].append(getAttribute("Background", i["Background"]))
    token["attributes"].append(getAttribute("Skin", i["Skin"]))
    token["attributes"].append(getAttribute("Accessory", i["Accessory"]))
    token["attributes"].append(getAttribute("Body", i["Body"]))
    token["attributes"].append(getAttribute("Chin", i["Chin"]))
    token["attributes"].append(getAttribute("Ear", i["Ear"]))
    token["attributes"].append(getAttribute("Face", i["Face"]))
    token["attributes"].append(getAttribute("Head", i["Head"]))
    token["attributes"].append(getAttribute("Neck", i["Neck"]))
    token["attributes"].append(getAttribute("Necklace", i["Necklace"]))

    with open('./out/' + str(token_id) + '.json', 'w') as outfile:
        json.dump(token, outfile, indent=4)
f.close()



