const allValidCallbackString = `tick onClose onPlayerJoin onPlayerLeave onPlayerJump onRespawnRequest
playerCommand onPlayerChat onPlayerChangeBlock onPlayerDropItem
onPlayerPickedUpItem onPlayerSelectInventorySlot onBlockStand
onPlayerAttemptCraft onPlayerCraft onPlayerAttemptOpenChest
onPlayerOpenedChest onPlayerMoveItemOutOfInventory onPlayerMoveInvenItem
onPlayerMoveItemIntoIdxs onPlayerSwapInvenSlots onPlayerMoveInvenItemWithAmt
onPlayerAttemptAltAction onPlayerAltAction onPlayerClick
onClientOptionUpdated onMobSettingUpdated onInventoryUpdated onChestUpdated
onWorldChangeBlock onCreateBloxdMeshEntity onEntityCollision
onPlayerAttemptSpawnMob onWorldAttemptSpawnMob onPlayerSpawnMob
onWorldSpawnMob onWorldAttemptDespawnMob onMobDespawned onPlayerAttack
onPlayerDamagingOtherPlayer onPlayerDamagingMob onMobDamagingPlayer
onMobDamagingOtherMob onAttemptKillPlayer onPlayerKilledOtherPlayer
onMobKilledPlayer onPlayerKilledMob onMobKilledOtherMob onPlayerPotionEffect
onPlayerDamagingMeshEntity onPlayerBreakMeshEntity onPlayerUsedThrowable
onPlayerThrowableHitTerrain onTouchscreenActionButton onTaskClaimed
onChunkLoaded onPlayerRequestChunk onItemDropCreated
onPlayerStartChargingItem onPlayerFinishChargingItem doPeriodicSave`;

const allCallbacks = allValidCallbackString.split(/\s+/);

const badToast = document.getElementById('badToast');
const badToastBs = bootstrap.Toast.getOrCreateInstance(badToast);

const goodToast = document.getElementById('goodToast');
const goodToastBs = bootstrap.Toast.getOrCreateInstance(goodToastBs);

function onSubmitHidecode() {
    const enteredCallbacks = document.getElementById("callbacks").value.split(/\s+/);
    const worldCode = document.getElementById("ogcode").value;

    let resultBlockCode = worldCode + `;\n`;
    let resultWorldCode = "let nd=false,ltndt=false;methods={};lc=(n,p=null)=>{try{const m=methods[n];if(!m){if(p)api.sendMessage(p,`Error: Callback ${n} doesnt work! Please wait for someone to fix this!`);nd=true;return false}return m}catch(e){if(p)api.sendMessage(p,`Error: ${e}! Please wait for the owner to fix this!`);nd=true;return false}};tick=()=>{if(nd){try{typeof methods.tick=='function'&&(methods.tick(),nd=false,ltndt=true)}catch(e){nd=true,ltndt=false}}!nd&&ltndt&&(ltndt=false,api.broadcastMessage('Someone has fixed!'),api.getPlayerIds().forEach(id=>onPlayerJoin(id)))};\n";
    for (let i=0; i!=enteredCallbacks.length; i++) {
        if (!(allCallbacks.includes(enteredCallbacks[i]))) {
            document.getElementById("worldcode").value = '';
            document.getElementById("codeblock").value = '';
            badToastBs.show()
            return;
        };
        resultBlockCode += `methods.${enteredCallbacks[i]} = ${enteredCallbacks[i]};`;
        if (enteredCallbacks[i] === "tick") continue;
        resultWorldCode += `${enteredCallbacks[i]}=(...a)=>{const f=lc("${enteredCallbacks[i]}",a[0]);f&&f(...a)};\n`
        
    }

    if (!(enteredCallbacks.includes("tick"))) {
        resultBlockCode += `methods.tick = ()=>{};`;
    }

    document.getElementById("worldcode").value = resultWorldCode;
    document.getElementById("codeblock").value = resultBlockCode;
    goodToastBs.show()
}