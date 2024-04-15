wl = "Pepper Tree" -- change as you want
dl = "Cave Background" -- change as you want

user_home = os.getenv("USERPROFILE") or os.getenv("HOME")
logs_file_path = user_home .. "\\Desktop\\depo\\balance.txt"
currentTotal = 0

function updateBalance(balance)
    local file = io.open(logs_file_path, "w")
    if file then
        file:write(balance .. "\n")
        file:close()
    else
        print("Error: Unable to open the file.")
    end
end

function writetxt(text)
    local file = io.open(logs_file_path, "a")
    if file then
        file:write(text .. "\n")
        file:close()
    else
        print("Error: Unable to open the file.")
    end
end

function getlocks(varlist)
    if varlist[0] == "OnConsoleMessage" and varlist[1]:find("Collected `w") and varlist[1]:find("``. Rarity: `w") and varlist[1]:find("``") then
        amount, name = varlist[1]:match("Collected `w(%d+) (.+)``. Rarity: `w")
        if name == wl then
            SendPacket(2, "action|input\n|text|`9deposited `3"..amount.." `9World locks")
            currentTotal = currentTotal + tonumber(amount)
            writetxt("wl - "..amount)
        elseif name == dl then
            SendPacket(2, "action|input\n|text|`cdeposited `3"..amount.." `cDiamond locks")
            currentTotal = currentTotal + tonumber(amount) * 100
            writetxt("dl - "..amount)
        else
            SendPacket(2, "action|input\n|text|`4please drop wls or dls.")
        end
        updateBalance(currentTotal)
        return true
    end
end

AddCallback("getlocks", "OnVarlist", getlocks)
