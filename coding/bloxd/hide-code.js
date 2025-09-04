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

function onSubmitHidecode() {
    const enteredCallbacks = document.getElementById("callbacks").innerText.split(/\s+/);
    const worldCode = document.getElementById("ogcode").innerText;

    let resultBlockCode = worldCode + `;\n`;
    let resultWorldCode = "let nd=false,ltndt=false;methods={};lc=(n,p=null)=>{try{const m=methods[n];if(!m){if(p)api.sendMessage(p,`Error: Callback ${n} doesnt work! Please wait for someone to fix this!`);nd=true;return false}return m}catch(e){if(p)api.sendMessage(p,`Error: ${e}! Please wait for the owner to fix this!`);nd=true;return false}};tick=()=>{if(nd){try{typeof methods.tick=='function'&&(methods.tick(),nd=false,ltndt=true)}catch(e){nd=true,ltndt=false}}!nd&&ltndt&&(ltndt=false,api.broadcastMessage('Someone has fixed!'),api.getPlayerIds().forEach(id=>onPlayerJoin(id)))};\n";
    for (let i=0; i!=enteredCallbacks.length; i++) {
        if (!(allCallbacks.includes(enteredCallbacks[i]))) {
            document.getElementById("worldcode").innerText = `Error! << ${enteredCallbacks[i]} >> isn't a valid callback!`;
            document.getElementById("codeblock").innerText = "Error. Read << World Code >> message above!";
            return;
        };
        resultBlockCode += `methods.${enteredCallbacks[i]} = ${enteredCallbacks[i]};`;
        resultWorldCode += `${enteredCallbacks[i]}=(...a)=>{const f=lc("${enteredCallbacks[i]}",a[0]);f&&f(...a)};\n`
    }

    if (!(enteredCallbacks.includes("tick"))) {
        resultBlockCode += `methods.tick = ()=>{};`;
    }

    document.getElementById("worldcode").innerText = resultWorldCode;
    document.getElementById("codeblock").innerText = resultBlockCode;
}